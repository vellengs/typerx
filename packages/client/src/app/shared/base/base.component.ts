import { ModalHelper, _HttpClient, CNCurrencyPipe, YNPipe, AlainI18NService, SettingsService } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input, NgModuleFactoryLoader, SystemJsNgModuleLoader, Renderer2 } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { BasePage } from 'types/types';
import { HttpClient } from '@angular/common/http';
import { LazyService } from '@delon/util';
import { CoreService } from 'generated';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-base-component',
    template: ''
})
export class BaseComponent implements BasePage {

    @Input() title = '';
    modalHelper: ModalHelper;
    settings: SettingsService;

    msg: NzMessageService;
    modal: NzModalService;
    route: ActivatedRoute;
    xlsx: XlsxService;
    loader: SystemJsNgModuleLoader;
    client: _HttpClient;
    lazy: LazyService;
    coreService: CoreService;
    http: HttpClient;
    renderer: Renderer2;


    constructor(public injector: Injector) {
        this.modalHelper = this.injector.get(ModalHelper);
        this.settings = this.injector.get(SettingsService);
        this.msg = this.injector.get(NzMessageService);
        this.modal = this.injector.get(NzModalService);
        this.route = this.injector.get(ActivatedRoute);
        this.xlsx = this.injector.get(XlsxService);
        this.loader = this.injector.get(SystemJsNgModuleLoader);
        this.client = this.injector.get(_HttpClient);
        this.lazy = this.injector.get(LazyService);
        this.http = this.injector.get(HttpClient);
        this.renderer = this.injector.get(Renderer2);
        this.coreService = this.injector.get(CoreService);
        const routeData = this.route.data['value'] || {};
        this.title = routeData.title;
    }

    load(): void {

    }

    reload(): void {

    }
}
