import { BaseWidget } from './../base.widget';
import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { LocalStorageService } from 'angular-web-storage';


@Component({
    selector: 'app-column-settings-widget',
    templateUrl: 'column.settings.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class ColumnSettingsWidget extends BaseWidget implements AfterViewInit {

    cols = [];

    constructor(
        public storage: LocalStorageService) {
        super();
    }

    changeValue($event, item) {

        console.log('event', $event);
        const key = this.schema.widget.storageKey;
        const values = {};
        this.cols.forEach((col) => {
            values[col.field] = {
                hidden: !col.visible
            };
        });

        values[item.field].hidden = !$event;
        // console.log(item.field, ':', item.visible);
        this.storage.set(key, values);

        // console.log('this.schema.widget.columns:', values);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();

        // console.log('this.schema.widget.columns', this.schema.widget.columns);

        if (this.schema.widget.columns) {
            this.cols = this.schema.widget.columns.map((col) => {
                const item = {
                    visible: col.hidden !== true,
                    header: col.header,
                    field: col.field
                };
                return item;
            });
        }
        // console.log('cols', this.schema.widget.columns);
    }
}
