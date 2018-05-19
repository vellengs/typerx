import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input, NgModuleFactoryLoader, SystemJsNgModuleLoader, EventEmitter, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { BasePage } from 'types/types';
import { HttpClient } from '@angular/common/http';
import { LazyService } from '@delon/util';
import { BaseComponent } from '@shared/base/base.component';

@Component({
    selector: 'app-base-detail',
    templateUrl: './base.detail.html'
})
export class BaseDetailComponent extends BaseComponent implements OnInit {


    @Input() schema: any;
    @Input() model: any = {};
    @Input() domain: string;
    @Input() keyword: string;
    @Input() field: string[];
    @Input() onFormChanged: EventEmitter<any>;

    constructor(public injector: Injector) {
        super(injector);


    }

    ngOnInit(): void {
        console.log('schema', this.schema);
    }

    load(): void {

    }
    reload(): void {

    }

    submit(event?) {

    }
}
