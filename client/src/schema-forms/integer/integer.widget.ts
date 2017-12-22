import {
    Component,
} from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-integer-widget',
    templateUrl: 'integer.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class IntegerWidget extends BaseWidget { }
