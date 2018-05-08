import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseWidget } from './../base.widget';

@Component({
    selector: 'app-radio-widget',
    templateUrl: 'radio.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class RadioWidget extends BaseWidget implements OnInit, AfterViewInit {

    value;
    constructor(
        private ajax: AjaxProxy,
    ) {
        super();
    }

    entries = [];
    async ngOnInit() {
        if (this.schema.widget && this.schema.widget.category) {

            await this.loadDict();
            // this.control.setValue(null);
            // setTimeout(() => {
            //     this.control.setValue(this.value);
            // }, 0);
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.value = this.control.value;
    }

    loadDict() {
        return this.ajax.proxy.ajax({
            method: 'GET',
            url: `dict/category/${this.schema.widget.category}`,
        }).toPromise().then((res) => {
            if (res && res.length) {
                this.entries = res;
            }
        });
    }
}
