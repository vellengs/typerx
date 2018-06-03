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
        // this.selectedNodes = [];
        // this.findChildNodes(this.nodes);
        // const selectedValue = this.multiple ? this.globalSelecteds : this.model;
        // this.subject.next({ value: selectedValue, dialog: this.subject });
    }

    cleanAll() {

    }

    removeOne(item) {

    }

    cancel(event?) {
        this.modalRef.destroy('onCancel');
    }

}
