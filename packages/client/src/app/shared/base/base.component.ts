import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { BasePage } from 'types/types';
import { HttpClient } from '@angular/common/http';
import { LazyService } from '@delon/util';

@Component({
    selector: 'app-base-component',
    template: ''
})
export class BaseComponent implements BasePage {


    @Input() title = '';
    modalHelper: ModalHelper;
    msg: NzMessageService;
    modal: NzModalService;
    route: ActivatedRoute;
    xlsx: XlsxService;
    loader: SystemJsNgModuleLoader;
    client: HttpClient;
    lazy: LazyService;

    constructor(public injector: Injector) {
        this.modalHelper = this.injector.get(ModalHelper);
        this.msg = this.injector.get(NzMessageService);
        this.modal = this.injector.get(NzModalService);
        this.route = this.injector.get(ActivatedRoute);
        this.xlsx = this.injector.get(XlsxService);
        this.loader = this.injector.get(SystemJsNgModuleLoader);
        this.client = this.injector.get(HttpClient);
        this.lazy = this.injector.get(LazyService);
    }

    load(): void {

    }

    reload(): void {

    }
}
