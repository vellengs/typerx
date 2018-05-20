import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, ModalOptionsForService } from 'ng-zorro-antd';
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
import { BaseDetailComponent } from '@shared/base/base.detail.component';
declare var System;

@Component({
    selector: 'app-base-stand',
    template: './base.stand.html'
})
export class BaseStandComponent extends BaseTableComponent implements CurdPage {

    private loaded = false;
    private list: any = {};
    private emitter: Subject<boolean> = new Subject<boolean>();

    public onConfigChanged: EventEmitter<any> = new EventEmitter();
    public onEditFormChanged: EventEmitter<any> = new EventEmitter();
    public onAddFormChanged: EventEmitter<any> = new EventEmitter();

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
            this.onConfigChanged.emit(config);
        }
    }

    add(): void {

        const params: ModalOptionsForService = {
            nzTitle: this.formSets.add.title,
            nzMaskClosable: false,
            nzFooter: [{
                label: '取消',
                onClick: (instance) => {
                    instance.modalRef.close();
                }
            },
            {
                label: '保存',
                type: 'primary',
                onClick: (instance) => {

                }
            },
            ]
        };
        this.modalHelper
            .static(BaseDetailComponent, {
                schema: this.formSets.add,
                onFormChanged: this.onAddFormChanged
            }, 'lg',
                params
            )
            .subscribe(res => {
                // this.ajax.proxy.post(`api/${this.domain}`, res.value).subscribe((entry) => {
                //     this.message.info('保存成功');
                //     res.dialog.destroy();
                //     this.load();
                // });
            });
    }

    edit(entry: any): void {

    }

    remove(entry: any): void {

        const self = this;
        this.modal.confirm({
            nzOkText: '确定',
            nzCancelText: '取消',
            nzTitle: '提示',
            nzContent: '确定删除该记录吗？',
            async nzOnOk() {
                self.client.delete(`api/${self.domain}/${entry.id}`).subscribe((item) => {
                    if (item) {
                        self.msg.info('删除成功');
                        self.load();
                    }
                });
            },
            nzOnCancel() {
            }
        });
    }

    removeChecked(): void {

    }

    load(): void {

    }

    reload(): void {

    }

}
