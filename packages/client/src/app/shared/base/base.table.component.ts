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
import { BaseTable, FormSets } from 'types/types';

@Component({
    selector: 'app-base-table',
    template: './base.table.html'
})
export class BaseTableComponent extends BaseComponent implements BaseTable {

    @Input() domain;
    @Input() queryParams: any = {};

    columnSets: {
        [key: string]: SimpleTableColumn[]
    };
    
    formSets: FormSets;
    total = 0;

    constructor(public injector: Injector) {
        super(injector);
    }

    load(): void {

    }

    reload(): void {

    }

}
