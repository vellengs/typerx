import { BaseWidget } from './../base.widget';
import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';

@Component({
    selector: 'app-boolean-widget',
    templateUrl: 'boolean.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class BooleanWidget extends BaseWidget implements AfterViewInit {

    checked: any = {};

    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
                if (newValue && Array.isArray(newValue)) {
                    newValue.map(v => this.checked[v] = true);
                }
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }

    onCheck(el) {
        if (el.checked) {
            this.checked[el.value] = true;
        } else {
            delete this.checked[el.value];
        }
        this.formProperty.setValue(Object.keys(this.checked), false);
    }
}
