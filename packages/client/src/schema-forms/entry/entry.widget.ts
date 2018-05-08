import { BaseWidget } from './../base.widget';

import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';

@Component({
    selector: 'app-entry-widget',
    templateUrl: 'entry.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class EntryWidget extends BaseWidget implements AfterViewInit {

    fields = [];

    ngAfterViewInit() {
        if (this.schema.widget) {
            if (this.schema.widget.fields) {
                this.fields = this.schema.widget.fields;
            } else {
                const fieldsets = this.formProperty.schema.fieldsets;
                if (fieldsets.length) {
                    this.fields = fieldsets[0].fields;
                }
            }
        }
    }

}
