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

@Component({
    selector: 'app-base-list',
    template: './base.list.html'
})
export class BaseListComponent extends BaseComponent {

    constructor(public injector: Injector) {
        super(injector);
    }

    query(params: any) {
        console.log('params', params);
    }

}
