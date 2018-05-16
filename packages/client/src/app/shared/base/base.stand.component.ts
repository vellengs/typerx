import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, Injector } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ModalHelper } from '@delon/theme';
import { XlsxService, SimpleTableColumn, STExportOptions } from '@delon/abc';
import * as XLSX from 'xlsx';
import { BaseComponent } from './base.component';
import { SFSchema, SFUISchema } from '@delon/form';
import { BaseTable, CurdPage } from 'types/types';
import { BaseTableComponent } from '@shared/base/base.table.component';

@Component({
    selector: 'app-base-stand',
    template: './base.stand.html'
})
export class BaseStandComponent extends BaseTableComponent implements CurdPage {

    formSets;

    constructor(public injector: Injector) {
        super(injector);
        setTimeout(() => {
            this.loadConfig();
        }, 0);
    }

    private loadConfig() {
        // console.log('domain:', this.domain);
        // const appearance = `appearances/${this.domain}.appearance`;
        // import(appearance).then(config => {
        //     console.log('test ...', config);
        // });
    }

    add(): void {

    }

    edit(entry: any): void {

    }

    remove(entry: any): void {

    }

    removeChecked(): void {

    }

    load(): void {

    }

    reload(): void {

    }

}
