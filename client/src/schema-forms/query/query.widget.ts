
import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { ActionRegistry, FormProperty } from 'angular2-schema-form/dist/model';

@Component({
    selector: 'app-query-widget',
    templateUrl: 'query.widget.html',
    styles: [
        `
        nz-form-element{

        }
        a,a:hover,a:actived {
            text-decoration:none;
        }

        `
    ]
})
// tslint:disable-next-line:component-class-suffix
export class QueryWidget extends ControlWidget implements AfterViewInit {
    public formProperty;

    collapsed = false;

    constructor(private actionRegistry: ActionRegistry) {
        super();
    }

    ngAfterViewInit() {

    }

    search(event) {
        const actions = this.actionRegistry.actions;
        if (actions && actions.hasOwnProperty('submitQuery')) {
            actions.submitQuery(this.formProperty, event);
        }
    }

    clear() {
        this.formProperty.reset();
    }

}
