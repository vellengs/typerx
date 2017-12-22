
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';
import { ModalHelper } from '@delon/theme/services/modal/modal.helper';

// import { AjaxProxy } from '@core/proxy/ajax/ajax';
// import { ListSearchComponent } from '@shared/list/list.search';
// import { TreeListComponent } from '@shared/list/tree.list';

@Component({
    selector: 'app-picker-widget',
    templateUrl: 'picker.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class PickerWidget extends BaseWidget implements OnInit, AfterViewInit {

    model: any = {};
    dialogs: any = {
        treeList: 'TreeListComponent',
        listSearch: 'ListSearchComponent',
    };

    constructor(
        public modalHelper: ModalHelper
    ) {
        super();
    }

    openModal() {

        const widgetTitle = this.schema.widget.title;
        const modalParams = {
            footer: false,
            style: {
                top: '30px'
            },
            zIndex: 102
        };

        if (widgetTitle) {
            Object.assign(modalParams, { title: widgetTitle });
        }

        const dialog = this.schema.widget.dialog;
        const params = this.schema.widget.params || {};

        this.modalHelper
            .open(this.dialogs[dialog], params, 'lg',
            modalParams)
            .subscribe(res => {
                // console.log('res', res);
                this.control.setValue(res.value.uid);
                if (res.value) {
                    this.model = res.value;
                }
                res.dialog.destroy();
            });
    }

    ngOnInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                this.model = newValue || {};
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter(e => {
                    return e.path && e.path.slice(1) === this.formProperty.path;
                })
                .map(e => e.message);
            this.errorMessages = messages.filter((m, i) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.model = newValue || {};

            this.formProperty.setValue(newValue, false);
        });
    }


    clear(ev) {
        ev.stopPropagation();
        this.model = {};
        this.control.setValue(null);
    }

}
