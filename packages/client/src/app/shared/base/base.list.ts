import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ModalHelper } from '@delon/theme';
import { XlsxService, SimpleTableColumn, STExportOptions } from '@delon/abc';
import * as XLSX from 'xlsx';

export interface CachedDict {
    [k: string]: string;
}

export class Dict {
    category: string;           // 字典类别
    name: string;             	// 键名
    translate: string;			// 显示名称
}


interface ExportOptions {
    /** @private */
    _d: any[];
    /** @private */
    _c: ExportTableColumn[];
    /** 工作溥名 */
    sheetname?: string;
    /** 文件名 */
    filename?: string;
    /** triggers when saveas */
    callback?: (wb: any) => void;
}

interface ExportTableColumn {
    title: string;
    type?: 'prop' | 'checkbox' | 'radio' | 'img' | 'currency' | 'number' | 'date' | 'yn';
    index: string[];
    exported?: boolean;
    buttons?: any;
    [key: string]: any;
}


@Component({
    selector: 'app-base-list',
    template: ''
})
export class BaseListComponent implements OnInit, OnDestroy {

    public onEntriesLoaded: EventEmitter<any[]> = new EventEmitter();
    public onSchemaReady: EventEmitter<any> = new EventEmitter();
    public onEditFormChanged: EventEmitter<any> = new EventEmitter();
    public onAddFormSchemaReady: EventEmitter<any>;
    public onEditFormSchemaReady: EventEmitter<any>;

    @Input() domain = '';
    @Input() title = '';
    @Input() defQueryParam = {};

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
    inited = false;

    querySchema;
    entrySchema;
    columns = [];
    columnHeaders = [];
    selectedEntries = [];
    selectedValue;
    entries = [];
    queryParams: any = {};

    cachedDict: CachedDict = {};

    constructor(
        public modalHelper: ModalHelper,
        public message: NzMessageService,
        public modalService: NzModalService,
        public route: ActivatedRoute,
        public xlsx?: XlsxService,
    ) {
        // console.log('xlsx', this.xlsx);
    }


    ngOnDestroy() {

    }

    ngOnInit() {
        this.domain = this.domain || this.route.data['value']['domain'];
        this.title = this.title || this.route.data['value']['title'];
        this.preload();
    }

    queryFormChanged(event) {
        this.queryParams = Object.assign(event.value);
    }

    onPageIndexChanged(index: number) {
        if (this.inited) {
            this.pageIndex = index;
            this.selectedEntries = [];
            this.reload(index, this.pageSize);
        }
    }

    onPageSizeChanged(size: number) {
        if (this.inited) {
            this.pageSize = size;
            this.reload(this.pageIndex, size);
        }
    }

    reload(index: number, size: number) {
        this.load(index, size);
    }

    requiredDependOn(schema: any, value: any, required: string, depend: string) {

        if (!value || !schema) {
            return;
        }

        if (value[depend] !== true) {
            schema.required = schema.required.filter((item) => {
                return item !== required;
            });
        } else if (schema.required.indexOf(required) < 0) {
            schema.required.push(required);
        }
    }

    pipe(value: any, format: string) {

        if (value === null || value === '') {
            return '';
        }

        const formatItems = format.split(':');
        const pipeName = formatItems[0];

        formatItems.shift();
        const params = formatItems.join(':');
        const pipes = {
            date: {
                transform: (val, f) => {
                    if (val) {
                        return '';
                    } else {
                        return val;
                    }
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
        return pipes[pipeName].transform(value, params);
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

    showModal() {

    }

    setQuerySchema(query) {
        this.querySchema = Object.assign({
            type: 'object',
            widget: 'query'
        }, { properties: query });
    }

    setColumnSchema(columns) {
        this.columnHeaders = columns.map((col) => {
            col.hidden = col.hidden === true;
            return col;
        });

        this.columns = columns.filter((col: any) => {
            return col.hidden !== true;
        });

        this.columnHeaders = Object.assign([], this.columnHeaders);
        this.columns = Object.assign([], this.columns);
    }

    getFormSchema(config, name) {
        const widget = (this.formsConfig[name] || {}).widget || 'entry';


        return Object.assign({
            type: 'object',
            widget: widget,
        }, { properties: config.entry, required: config.required || [] });
    }


    async loadAppearanceConfig() {

    }

    preload() {
        this.loadAppearanceConfig().then(() => {
            this.reload(this.pageIndex, this.pageSize);
        });
    }

    async load(index?: number, size?: number) {
        index = index || this.pageIndex;
        size = size || this.pageSize;

        const params = Object.assign(this.queryParams, this.defQueryParam,
            {
                page: index,
                size: size,
            }
        );

    }


    async edit() {

    }

    async add() {

    }

    disableAll() {

    }

    removeItems() {

    }

    remove(entry) {

    }

    showMsg(msg: string) {
        this.message.info(msg);
    }


}
