import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ControlWidget, SFSchemaEnum, SFComponent, SFSchemaEnumType } from '@delon/form';
import { getData } from '@shared/json-schema/util';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ModalHelper } from '@delon/theme';
import { TransferSelectorComponent } from '@shared/base/transfer.selector';
import { TransferItem } from '../../../../../types/types';

@Component({
    selector: 'sf-list-box',
    template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
     <nz-tag
        *ngFor="let i of data"
        nzMode="closeable"
        [nzChecked]="i.checked"
        (nzAfterClose)="handleClose(i)"
        (nzOnClose)="close($event)"
        (nzCheckedChange)="onChange(i)">
        {{i.label || i.name || i.title}}
      </nz-tag>
      <div>
      <button type="button" nz-button [nzType]="'dashed'" (click)="openModal()">
        {{ui.buttonName || 'add'}}
      </button>
      </div>
    </sf-item-wrap>`
})
export class ListBoxWidgetComponent extends ControlWidget implements OnInit {
    static readonly KEY = 'listBox';

    config: any;
    loadingTip: string;
    data: SFSchemaEnum[];
    selectorAsyncData: (input?: any) => Observable<TransferItem[]>;
    selectorTitle: string;
    constructor(
        @Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
        @Inject(SFComponent) public readonly sfComp: SFComponent,
        public client: HttpClient,
        public modal: ModalHelper,
    ) {
        super(cd, sfComp);
    }

    openModal() {
        this.modal
            .static(TransferSelectorComponent, {
                asyncData: this.selectorAsyncData
            }, 'lg',
                {
                    nzTitle: this.selectorTitle
                })
            .subscribe(res => {
                if (Array.isArray(res)) {
                    const items = res.map(val => {
                        return {
                            id: val.key,
                            label: val.title
                        };
                    });
                    this.data.push(...items);
                    this.data = this.uniqueArray(this.data);
                    this.detectChanges();
                    this.updateValue();
                }
            });
    }

    uniqueArray(array: any[]) {
        const stack = [], ids = [];
        for (let i = 0; i < array.length; i++) {
            if (!ids.includes(array[i].id)) {
                stack.push(array[i]);
            }
            ids.push(array[i].id);
        }
        return stack;
    }

    ngOnInit(): void {
        this.loadingTip = this.ui.loadingTip || '加载中……';
        this.config = this.ui.config || {};
        this.selectorTitle = this.ui.selectorTitle;
        this.selectorAsyncData = this.ui.selectorAsyncData;
    }

    getRemoteData(value: string, text?: string): Observable<SFSchemaEnumType[]> {
        const domain = this.ui.domain;
        const url = `api/${domain}/search`;
        return this.client.get(url, {
            params: {
                keyword: text || '',
                value: value
            }
        }) as any;
    }

    reset(value: any) {
        // this.ui.asyncData = () => this.getRemoteData(value);
        // console.log('value:', value);
        this.data = value;  // TODO;
        // getData(this.schema, this.ui, this.formProperty.formData).subscribe(
        //     list => {
        //         this.data = list;
        //         this.detectChanges();
        //     },
        // );
    }

    onChange(item: SFSchemaEnum) {
        item.checked = !item.checked;
        this.updateValue();
        if (this.ui.checkedChange) this.ui.checkedChange(item.checked);
    }

    handleClose(removed: any) {
        if (this.ui.afterClose) this.ui.afterClose();
        this.data = this.data.filter(tag => tag !== removed) || [];
        this.updateValue();
    }

    close(e: any) {
        if (this.ui.onClose) this.ui.onClose(e);
    }

    private updateValue() {
        this.formProperty.setValue(
            this.data,
            false,
        );
    }


}
