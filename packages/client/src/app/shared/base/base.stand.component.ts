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
import { BaseTable, CurdPage } from 'types/types';
import { BaseTableComponent } from '@shared/base/base.table.component';
import { Subject } from 'rxjs/Subject';
declare var System;

@Component({
    selector: 'app-base-stand',
    template: './base.stand.html'
})
export class BaseStandComponent extends BaseTableComponent implements CurdPage {

    formSets;

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
        // console.log('domain:', this.domain);
        const path = `/assets/scripts/appearances/${this.domain}.appearance.js`;
        // const appearances = await SystemJS.import(path);
        // console.log('module:', appearances);

        // const m = await this.loader.load('./../appearances/appearance.module#AppearanceModule');
        // console.log('m:', m);
        console.log('System:', System);
        const dn = await System.import(path);
        console.log('dn', dn);
        // });

    }

    private async loadScript(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.list[path] === true) {
                resolve(<any>{
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }

            this.list[path] = true;

            const node: any = document.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            node.charset = 'utf-8';
            if (node.readyState) { // IE
                node.onreadystatechange = () => {
                    if (node.readyState === 'loaded' || node.readyState === 'complete') {
                        node.onreadystatechange = null;
                        resolve(<any>{
                            path: path,
                            loaded: true,
                            status: 'Loaded'
                        });
                    }
                };
            } else {
                node.onload = () => {
                    resolve(<any>{
                        path: path,
                        loaded: true,
                        status: 'Loaded'
                    });
                };
            }
            node.onerror = (error: any) => resolve(<any>{
                path: path,
                loaded: false,
                status: 'Loaded'
            });
            document.getElementsByTagName('head')[0].appendChild(node);
        });
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
