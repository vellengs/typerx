import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';
import { SimpleTableComponent } from '@delon/abc';

@Component({
    selector: 'app-dicts-page',
    templateUrl: './dicts.html',
    styles: []
})
export class DictsPageComponent extends BaseStandComponent implements OnInit {

    @ViewChild('dictList') dictTable: BaseStandComponent;
    @Input() domain = 'dict';
    selectedItem: any = {};
    categories: any = [];
    dictQueryParams: any = {};

    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {

        this.queryUrl = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {
            const self = this;
        });

        this.operations = {
            title: '操作',
            width: '180px',
            buttons: [
                {
                    text: '删除',
                    type: 'del',
                    click: (record: any) => {
                        // if (this.accounts) {
                        //     this.accounts.remove(record, false);
                        // }
                    }
                },
                {
                    text: '编辑',
                    type: 'none',
                    click: (record: any) => {
                        // if (this.accounts) {
                        //     this.accounts.edit(record);
                        // }
                    }
                }
            ]
        };

        this.load();
    }

    async load() {
        const res = await this.coreService.dictQuery('', 'category', 0, 2000).toPromise();
        if (res) {
            this.categories = res.list;
        }
        super.load();
    }

    select(item) {
        this.selectedItem = item;
        this.dictQueryParams.category = this.selectedItem.name;
        if (this.dictTable) {
            this.dictTable.load();
        }
    }
    
}
