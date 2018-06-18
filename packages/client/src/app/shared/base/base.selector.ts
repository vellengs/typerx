import { Component, Injector, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/base/base.component';
import { NzModalRef } from 'ng-zorro-antd';
import { SimpleTableComponent } from '@delon/abc';

@Component({
    selector: 'app-base-selector',
    templateUrl: './base.selector.html'
})
export class BaseSelectorComponent extends BaseComponent {
    modalRef: NzModalRef;

    @Input() multiple = true;
    @Input() queryUrl = '';
    @Input() columns;
    @Input() queryParams: any = {};
    @ViewChild('simpleTable') simpleTable: SimpleTableComponent;

    selectedItems = [];

    constructor(public injector: Injector) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
    }

    model: any = {};

    save(event?) {
        this.modalRef.destroy(this.selectedItems);
    }

    cleanAll() {
        this.selectedItems.forEach((item) => {
            item.checked = false;
        });
        this.selectedItems = [];
    }

    removeOne(item) {
        const index = this.selectedItems.indexOf(item);
        if (index > -1) {
            item.checked = false;
            this.selectedItems.splice(index, 1);
        }
    }

    checkboxChange(list: any[]) {
        list.forEach((item) => {
            if (!this.hasBeenSelected(item)) {
                this.selectedItems.push(item);
            }
        });
    }

    hasBeenSelected(item) {
        const index = this.selectedItems.findIndex((entry) => {
            return entry.id === item.id;
        });
        return index > -1;
    }

    cancel(event?) {
        this.modalRef.destroy('onCancel');
    }

}
