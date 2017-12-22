import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';

import { BaseWidget } from './../base.widget';

@Component({
    selector: 'app-time-widget',
    templateUrl: 'time.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class TimeWidget extends BaseWidget implements AfterViewInit {

    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(new Date(newValue), { emitEvent: false });
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
            this.formProperty.setValue(newValue, false);
        });
    }
}
