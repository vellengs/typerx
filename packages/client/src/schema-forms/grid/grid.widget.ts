import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { ArrayLayoutWidget } from 'angular2-schema-form';
import { FormPropertyFactory, FormProperty } from 'angular2-schema-form/dist/model';
import { BaseListComponent } from '@shared/list/base.list';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-grid-widget',
    templateUrl: 'grid.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class GridWidget extends BaseListComponent implements OnInit, AfterViewInit {

    baseZindex = 101;
    schema: any;

    @Input() formProperty: FormProperty;

    ngOnInit() {
        if (this.schema.widget.query) {
            this.queryParams[this.schema.widget.query] = this.formProperty.value;
        }
        this.domain = this.schema.widget.domain;
        super.ngOnInit();
    }

    ngAfterViewInit() {

    }
}
