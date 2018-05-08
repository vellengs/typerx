import { Component } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-rate-widget',
    templateUrl: 'rate.widget.html',
    styles: [`
     .height{
        line-height:30px;
     }
    `]
})
// tslint:disable-next-line:component-class-suffix
export class RateWidget extends BaseWidget {

    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        } else {
            return this.schema.widget.id;
        }
    }

    onChange(ev) {
        const value = this.control.value;
        console.log('value:', ev);
    }

    clear() {
        // console.log("this control:", this.control);
        this.control.setValue(0);
        // this.control.reset();
    }
}
