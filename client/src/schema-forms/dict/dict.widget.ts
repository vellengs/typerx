import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { AjaxProxy } from '@core/proxy/ajax/ajax';

import { BaseWidget } from './../base.widget';

@Component({
    selector: 'app-dict-widget',
    templateUrl: 'dict.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class DictWidget extends BaseWidget implements AfterViewInit {

    constructor(
        private ajax: AjaxProxy,
    ) {
        super();
    }

    entries = [];
    nullable;
    ngAfterViewInit(): void {
        this.nullable = this.schema.widget.nullable;

        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });

        this.formProperty.errorsChanges.subscribe((errors) => {
            // control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter(e => {
                    return e.path && e.path.slice(1) === this.formProperty.path;
                })
                .map(e => e.message);
            this.errorMessages = messages.filter((m, i) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });

        this.loadDict();
    }

    changed(event) {

    }

    loadDict() {
        this.ajax.proxy.ajax({
            method: 'GET',
            url: `dict/category/${this.schema.widget.category}`,
        }).subscribe((res) => {
            if (res && res.length) {
                this.entries = res;
            }
        });
    }
}
