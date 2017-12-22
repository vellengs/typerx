import { AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form/dist/widget';

export class BaseWidget extends ControlWidget implements AfterViewInit {
    required = false;

    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(newValue, { emitEvent: false });
            }
        });

        this.formProperty.errorsChanges.subscribe((errors) => {
            // control.setErrors(errors, { emitEvent: true });  //TODO 需要判断是否当前控件
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

    getSize(id: string) {
        const config = this.schema.properties[id];
        if (config && config.widget && config.widget.size) {
            return config.widget.size;
        }

        if (config && config.type === 'array') {
            return 24;
        } else {
            return 8;
        }
    }
}
