import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { DetailComponent } from '@shared/detail/detail.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LocalStorageService } from 'angular-web-storage/core/service';
import * as moment from 'moment';
import { ModalHelper } from '@delon/theme';

export interface CachedDict {
    [k: string]: string;
}

export class Dict {
    category: string;           // 字典类别
    name: string;             	// 键名
    translate: string;			// 显示名称
}

@Component({
    selector: 'app-base-list',
    template: ''
})
export class BaseListComponent implements OnInit {

    @Input() domain = '';

    @Input() title = '';

    baseZindex = 100;

    set storageKey(value) {

    }

    get storageKey() {
        return `cols_${this.domain}`;
    }

    pageIndex = 1;
    pageSize = 10;
    total = 0;

    model: any = {};
    currentDate = new Date();
    schemaConfig: any = {};
    formsConfig: any = {};

    validators = {
        '/name': (value, property, form) => {
            // console.log('name:', value);
            let errors = null;
            errors = [{
                name: {
                    expectedValue: 'abcdefg',
                    actualValue: value
                }
            }];

            return errors;
        }
    };

    querySchema;
    entrySchema;
    columns = [];
    columnHeaders = [];
    selectedEntries = [];
    selectedValue;
    entries = [];

    queryParams: any = {};

    actions = {
        send: (property, options) => {
            if (property.valid) {

            } else {
                if (property._errors.length) {
                }
            }
        },
        reset: (form, options) => {
            form.reset();
        },
        submitQuery: (form, options) => {
            this.load();
        },
        disableAll: this.disableAll.bind(this)
    };

    cachedDict: CachedDict = {};

    constructor(
        public modalHelper: ModalHelper,
        public message: NzMessageService,
        public ajax: AjaxProxy,
        public modalService: NzModalService,
        public route: ActivatedRoute,
        public storage: LocalStorageService,
        public subject?: NzModalSubject
    ) {
    }

    queryFormChanged(event) {
        this.queryParams = Object.assign(event.value);
    }

    onPageIndexChanged(index: number) {
        this.reload(index, this.pageSize);
    }

    onPageSizeChanged(size: number) {
        this.reload(this.pageIndex, size);
    }


    reload(index: number, size: number) {
        this.load(index, size);
    }

    pipe(value: any, format: string) {

        if (value === null || value === '') {
            return '';
        }

        const formatItems = format.split(':');
        const pipeName = format.split(':')[0];
        const pipes = {
            date: {
                transform: (val, f) => {
                    return moment(val).format(f);
                }
            },
            currency: new CurrencyPipe('zh-CN'),
            dict: {
                transform: (val, category) => {
                    if (val && val.length && Array.isArray(val)) {
                        return val.map((item) => {
                            return this.getDicts(item, category);
                        }).join(',');
                    }

                    return this.getDicts(val, category);
                }
            },
            prop: {
                transform: (obj: any, prop: string) => {
                    if (obj && obj.length && obj.map) {
                        return obj.map((item) => {
                            return this.getProperty(item, prop);
                        }).join(',');
                    }
                    return this.getProperty(obj, prop);
                }
            }
        };
        return pipes[pipeName].transform(value, formatItems[1]);
    }

    getProperty(obj, prop) {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return obj;
    }

    getDicts(value, category) {
        const key = category + value;
        if (this.cachedDict[key]) {
            return this.cachedDict[key];
        }
        return value;
    }

    queryDicts(category) {
        this.ajax.proxy.get('api/dict/category/' + category).subscribe((res: Dict[]) => {
            if (res) {
                res.forEach((dict) => {
                    this.cachedDict[dict.category + dict.name] = dict.translate;
                });
            }
        });
    }

    showModal() {
        this.modalHelper
            .open(DetailComponent, {
                schema: {
                    type: 'object',
                    properties: {},
                    widget: {
                        id: 'columnSettings',
                        storageKey: this.storageKey,
                        columns: this.columnHeaders
                    }
                }, model: {}
            }, 660, {
                title: '编辑',
                footer: false,
                style: {
                    top: '30px'
                },
                zIndex: 1001 // https://github.com/NG-ZORRO/ng-zorro-antd/issues/317
            })
            .subscribe(res => {
                this.preload();
                res.dialog.destroy();
            });
    }

    setQuerySchema(query) {
        this.querySchema = Object.assign({
            type: 'object',
            widget: 'query'
        }, { properties: query });
    }

    getFormSchema(config, name) {
        const widget = (this.formsConfig[name] || {}).widget || 'entry';
        return Object.assign({
            type: 'object',
            widget: widget,
        }, { properties: config.entry, required: config.required || [] });
    }

    preload() {

        this.ajax.getSchemaConfig(this.domain).subscribe((res) => {
            this.schemaConfig = res || {
                entry: {},
                query: {},
                required: [],
                columns: [],
                forms: {}
            };
            this.formsConfig = res.forms || {};

            this.setQuerySchema(this.schemaConfig.query);

            const cols = this.storage.get(this.storageKey) || {};

            this.columnHeaders = this.schemaConfig.columns.map((col) => {
                col.hidden = (cols[col.field] || col).hidden === true;
                return col;
            });
            this.columns = this.schemaConfig.columns.filter((col: any) => {
                return col.hidden !== true;
            });

            this.columns.forEach((col) => {
                if (col.format && col.format.indexOf('dict') > -1) {
                    const category = col.format.split(':')[1];
                    this.queryDicts(category);
                }
            });

            this.reload(this.pageIndex, this.pageSize);
        });
    }

    ngOnInit() {
        this.domain = this.domain || this.route.data['value']['domain'];
        this.title = this.title || this.route.data['value']['title'];

        this.preload();
    }

    async load(index?: number, size?: number) {
        index = index || this.pageIndex;
        size = size || this.pageSize;
        const params = Object.assign(this.queryParams,
            {
                page: index,
                size: size,
            }
        );

        this.ajax.proxy.ajax({
            method: 'GET',
            url: `${this.domain}/query`,
            options: {
                params: params
            }
        }).subscribe((res) => {
            if (res) {
                this.entries = res.docs;
                this.total = res.total;
            }
        });
    }

    async edit(entry, tabs?: any[]) {

        const modelData = await this.ajax.proxy.get(`api/${this.domain}/` + entry.uid).toPromise();
        const schema = this.getFormSchema(this.schemaConfig, 'edit');
        const widgetTitle = schema.widget.title;

        const modalParams = {
            footer: false,
            style: {
                top: '30px'
            },
            zIndex: this.baseZindex + 1
        };

        if (widgetTitle) {
            Object.assign(modalParams, { title: widgetTitle });
        }

        this.modalHelper
            .open(DetailComponent, { schema: schema, model: modelData }, 'lg',
            modalParams)
            .subscribe(res => {
                const item = Object.assign({ uid: entry.uid }, res.value);
                this.ajax.proxy.put(`api/${this.domain}`, item).subscribe((result) => {
                    this.message.info('保存成功');
                    res.dialog.destroy();
                    this.load();
                });
            });
    }

    disableAll() {
        Object.keys((this.querySchema || {}).properties).map(prop => {
            this.querySchema.properties[prop].readOnly = true;
        });
    }

    logErrors(error) {

    }


    addEntry(tabs?: any[]) {

        const schema = this.getFormSchema(this.schemaConfig, 'add');
        const widgetTitle = schema.widget.title;

        const modalParams = {
            footer: false,
            style: {
                top: '30px'
            },
            zIndex: this.baseZindex + 1
        };

        if (widgetTitle) {
            Object.assign(modalParams, { title: widgetTitle });
        }

        this.modalHelper
            .open(DetailComponent, { schema: schema }, 'lg',
            modalParams
            )
            .subscribe(res => {
                this.ajax.proxy.post(`api/${this.domain}`, res.value).subscribe((entry) => {
                    this.message.info('保存成功');
                    res.dialog.destroy();
                    this.load();
                });
            });
    }

    removeItems() {
        const ids = this.selectedEntries.map((entry) => {
            return entry.uid;
        });
        this.ajax.proxy.delete(`api/${this.domain}/` + ids.join(',')).subscribe((entry) => {
            if (entry) {
                this.message.info('删除成功');
                this.load();
            }
        });
    }

    showMsg(msg: string) {
        this.message.info(msg);
    }

}
