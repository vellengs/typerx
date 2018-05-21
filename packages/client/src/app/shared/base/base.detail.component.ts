import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
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
    modalRef: NzModalRef;
    value: any = {};

    constructor(public injector: Injector) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
        // this.modalRef.
    }

    ngOnInit(): void {
        console.log('schema', this.schema);
    }

    load(): void {

    }
    reload(): void {

    }

    formChanged($event) {
        this.value = $event;
    }

    submit(event?) {

        console.log('event:', event);

        // this.modalRef.next({ value: this.value, dialog: this.subject });

    }
}
