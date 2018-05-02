import { Component } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-range-widget',
    templateUrl: 'range.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class RangeWidget extends BaseWidget { }
