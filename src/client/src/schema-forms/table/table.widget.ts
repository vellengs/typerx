import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ArrayLayoutWidget } from 'angular2-schema-form';
import { FormPropertyFactory } from 'angular2-schema-form/dist/model';

@Component({
    selector: 'app-table-widget',
    templateUrl: 'table.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class TableWidget extends ArrayLayoutWidget implements OnInit, AfterViewInit {

    columns = [];

    constructor(
        private formPropertyFactory: FormPropertyFactory,
    ) {
        super();
    }

    ngOnInit(): void {

        const itemProp: any = this.formPropertyFactory.createProperty(this.formProperty.schema.items, null);

        itemProp.propertiesId.forEach((id) => {
            const name = this.formProperty.schema.items.properties[id].title;
            this.columns.push({ name: name });
        });

        // console.log('newProperty:', newProperty);
        // this.columns = this.formProperty.properties[0].propertiesId;
    }

    addItem() {
        this.formProperty.addItem();
    }

    removeItem(index: number) {
        console.log('index:', index);
        this.formProperty.removeItem(index);
    }

    trackByIndex(index: number, item: any) {
        return index;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        console.log('ss:', this.formProperty);
        console.log('properties:', this.formProperty.properties);

    }

}
