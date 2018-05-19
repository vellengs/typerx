import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, Injector, NgModuleFactoryLoader } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ModalHelper } from '@delon/theme';
import { XlsxService, SimpleTableColumn, STExportOptions } from '@delon/abc';
import * as XLSX from 'xlsx';
import { BaseComponent } from './base.component';
import { SFSchema, SFUISchema } from '@delon/form';
import { BaseTable, CurdPage, Appearance } from 'types/types';
import { BaseTableComponent } from '@shared/base/base.table.component';
import { Subject } from 'rxjs/Subject';
declare var System;

@Component({
    selector: 'app-base-stand',
    template: './base.stand.html'
})
export class BaseStandComponent extends BaseTableComponent implements CurdPage {
 

    private loaded = false;
    private list: any = {};
    private emitter: Subject<boolean> = new Subject<boolean>();

    constructor(public injector: Injector) {
        super(injector);
        setTimeout(() => {
            this.loadConfig();
        }, 0);
    }


    private async loadConfig() {
        const url = `api/${this.domain}/config`;
        const config: any = await this.client.get(url).toPromise();
        if (config) {
            this.columnSets = config.columnSets;
            this.formSets = config.formSets;
            console.log('formSets', config);
        }
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
