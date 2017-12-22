import {
    Component,
    Input,
    OnInit,
    AfterViewInit
} from '@angular/core';

import {
    FormControl
} from '@angular/forms';
import { FormProperty, ActionRegistry } from 'angular2-schema-form/dist/model';
import { Widget } from 'angular2-schema-form';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[nz-form-element]',
    templateUrl: 'element.html',
    styles: [
        `
        .ant-form-item-label{
            width:90px;
        }
        `
    ]
})
// tslint:disable-next-line:component-class-suffix
export class NzFormElementAtrr implements AfterViewInit {

    @Input() formProperty: FormProperty;
    control: FormControl = new FormControl('', () => null);
    collapsed = false;

    constructor() { }

    ngAfterViewInit() {
        const control = this.control;
        if (control && this.formProperty) {
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
    }

    changeCollapse() {
        this.collapsed = !this.collapsed;
        this.control.setValue(this.collapsed);
    }
}
