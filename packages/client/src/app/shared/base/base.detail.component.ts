import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input, NgModuleFactoryLoader, SystemJsNgModuleLoader, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { BasePage } from 'types/types';
import { HttpClient } from '@angular/common/http';
import { LazyService } from '@delon/util';
import { BaseComponent } from '@shared/base/base.component';

@Component({
    selector: 'app-base-detail',
    templateUrl: './base.detail.html'
})
export class BaseDetailComponent extends BaseComponent implements OnInit, AfterViewInit {

    @Input() schema: any;
    @Input() model: any = {};
    @Input() formData: any = {};
    @Input() domain: string;
    @Input() keyword: string;
    @Input() field: string[];
    @Input() onFormChanged: EventEmitter<any>;
    @Input() onSave: (entry: any) => Promise<any>;
    @Input() context: any;

    modalRef: NzModalRef;
    value: any = {

    };

    @ViewChild('sf') formRef: SFComponent;

    constructor(public injector: Injector, private elRef: ElementRef) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
    }

    ngAfterViewInit() {

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

    }

    onFormError(errors) {

    }

    async save(value) {
        const result = await this.onSave.call(this.context, value);
        this.modalRef.destroy(result);
    }
}
