import { ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { XlsxService, SimpleTableColumn } from '@delon/abc';
import { Component, Injector, Input } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { columnSets, formSets } from 'appearances/menu.appearance';
import { BasePage } from 'types/types';

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

    constructor(public injector: Injector) {
        this.modalHelper = this.injector.get(ModalHelper);
        this.msg = this.injector.get(NzMessageService);
        this.modal = this.injector.get(NzModalService);
        this.route = this.injector.get(ActivatedRoute);
        this.xlsx = this.injector.get(XlsxService);
    }

    load(): void {

    }
    
    reload(): void {

    }
}
