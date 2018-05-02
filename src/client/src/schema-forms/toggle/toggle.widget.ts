import { BaseWidget } from './../base.widget';
import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlWidget } from 'angular2-schema-form';

@Component({
    selector: 'app-toggle-widget',
    templateUrl: 'toggle.widget.html'
})

// tslint:disable-next-line:component-class-suffix
export class ToggleWidget extends BaseWidget implements AfterViewInit {


    collapsed = false;

    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }

    changeCollapse() {
        this.collapsed = !this.collapsed;
        this.control.setValue(this.collapsed);
    }
}
