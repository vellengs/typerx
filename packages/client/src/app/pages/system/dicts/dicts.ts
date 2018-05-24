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

    url;
    
    @ViewChild('st') simpleTable: SimpleTableComponent;

    @Input() domain = 'dict';
    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.url = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {
            const self = this;
            if (this.columnSets.default) {
                this.columnSets.default.push({
                    title: '操作区',
                    buttons: [
                        {
                            text: '删除',
                            click: (entry) => {
                                self.remove.call(self, entry);
                            }
                        },
                    ]
                });
            }

        });
        this.load();
    }

    load() {
        this.simpleTable.load(-1);
    }

}
