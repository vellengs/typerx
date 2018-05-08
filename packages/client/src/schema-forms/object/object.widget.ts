import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'angular2-schema-form';


@Component({
    selector: 'app-form-object',
    templateUrl: 'object.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class ObjectWidget extends ObjectLayoutWidget { }
