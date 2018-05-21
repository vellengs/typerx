import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input, NgModuleFactoryLoader, SystemJsNgModuleLoader, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
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
    @Input() formData: any = {};
    @Input() domain: string;
    @Input() keyword: string;
    @Input() field: string[];
    @Input() onFormChanged: EventEmitter<any>;
    modalRef: NzModalRef;
    value: any = {

    };

    @ViewChild('sf') formRef: SFComponent;


    constructor(public injector: Injector) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
    }

    ngOnInit(): void {

    }

    load(): void {

    }
    reload(): void {

    }

    reset() {
        this.formRef.reset();
    }

    formChanged($event) {
        this.value = $event;
    }

    submit(event?) {
        console.log('event:', event);
    }
}
