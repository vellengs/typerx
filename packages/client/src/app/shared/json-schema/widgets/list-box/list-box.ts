import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ControlWidget, SFSchemaEnum, SFComponent, SFSchemaEnumType } from '@delon/form';
import { getData } from '@shared/json-schema/util';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { ModalHelper } from '@delon/theme';
import { TransferSelectorComponent } from '@shared/base/transfer.selector';

@Component({
    selector: 'sf-list-box',
    template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
     <nz-tag
        *ngFor="let i of data"
        nzMode="closeable"
        [nzChecked]="i.checked"
        (nzAfterClose)="_afterClose()"
        (nzOnClose)="_close($event)"
        (nzCheckedChange)="onChange(i)">
        {{i.label}}
      </nz-tag>
        <br/>
      <button type="button" nz-button [nzType]="'primary'" (click)="openModal()">
        {{ui.buttonName || 'add'}}
      </button>
    </sf-item-wrap>`
})
export class ListBoxWidgetComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'listBox';

    // 组件所需要的参数，建议使用 `ngOnInit` 获取
    config: any;
    loadingTip: string;
    data: SFSchemaEnum[];

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

            }, 'lg',
                {
                    nzTitle: '测试'
                })
            .subscribe(res => {

            });
    }

    ngOnInit(): void {
        this.loadingTip = this.ui.loadingTip || '加载中……';
        this.config = this.ui.config || {};
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

        console.log('value:', value);

        // this.ui.asyncData = () => this.getRemoteData(value);
        getData(this.schema, this.ui, this.formProperty.formData).subscribe(
            list => {
                this.data = list;
                this.detectChanges();
            },
        );
    }

    onChange(item: SFSchemaEnum) {
        item.checked = !item.checked;
        this.updateValue();
        if (this.ui.checkedChange) this.ui.checkedChange(item.checked);
    }

    _afterClose() {
        if (this.ui.afterClose) this.ui.afterClose();
    }

    _close(e: any) {
        if (this.ui.onClose) this.ui.onClose(e);
    }

    private updateValue() {
        this.formProperty.setValue(
            this.data.filter(w => w.checked).map(i => i.value),
            false,
        );
    }


}
