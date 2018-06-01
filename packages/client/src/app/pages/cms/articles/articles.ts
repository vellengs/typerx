import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';
import { BaseComponent } from '@shared/base/base.component';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-articles-page',
    templateUrl: './articles.html',
    styles: []
})
export class ArticlesPageComponent extends BaseStandComponent implements OnInit {

    @Input() domain = 'article';
    configReady;
    queryUrl;




    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.queryUrl = `api/${this.domain}/query`;

        this.operations = {
            title: '操作',
            width: '180px',
            buttons: [
                {
                    text: '删除',
                    type: 'del',
                    click: (record: any) => {
                    }
                },
                {
                    text: '编辑',
                    type: 'none',
                    click: (record: any) => {
                        this.edit(record);
                    }
                }
            ]
        };

        this.onConfigChanged.subscribe((config) => {
            this.configReady = true;
        });
    }

}
