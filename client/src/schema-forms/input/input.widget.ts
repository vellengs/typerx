import { Component } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-input-widget',
    templateUrl: 'input.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class InputWidget extends BaseWidget {

    getInputType() {
        if (!this.schema.widget.id || this.schema.widget.id === 'string') {
            return 'text';
        } else {
            return this.schema.widget.id;
        }
    }
}
