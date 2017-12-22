import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-select-widget',
    templateUrl: 'select.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class SelectWidget extends BaseWidget implements AfterViewInit {

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

}
