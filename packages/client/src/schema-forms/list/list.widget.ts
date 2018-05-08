
import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';

@Component({
    selector: 'app-list-widget',
    templateUrl: 'list.widget.html',
    styles: [
        `
        nz-form-element{

        }
        `
    ]
})
// tslint:disable-next-line:component-class-suffix
export class ListWidget extends ControlWidget implements AfterViewInit {

    ngAfterViewInit() {

    }

}
