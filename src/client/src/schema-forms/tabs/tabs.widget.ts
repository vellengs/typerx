import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlWidget } from 'angular2-schema-form';
import { FormProperty, ActionRegistry, PropertyGroup } from 'angular2-schema-form/dist/model';

@Component({
    selector: 'app-tabs-widget',
    templateUrl: 'tabs.widget.html'
})

// tslint:disable-next-line:component-class-suffix
export class TabsWidget extends ControlWidget implements OnInit, AfterViewInit {


    @Input() formProperty: PropertyGroup;
    control: FormControl = new FormControl('', () => null);

    tabs = [];
    fields = [];
    currentIndex = 0;
    queryChange(event) {
        this.currentIndex = event[0].index;
        if (this.schema.widget.parts) {
            this.fields = this.schema.widget.parts[this.currentIndex];
            // console.log("this.fields", this.schema);
        }
    }

    ngOnInit() {
        this.tabs = this.schema.widget.tabs || [];
        this.fields = this.schema.widget.parts[this.currentIndex];
    }

    ngAfterViewInit() {

    }

    isRequired(fieldId) {
        return (this.formProperty.schema.required || []).indexOf(fieldId) > -1;
    }

    getSize(id: string) {
        const config = this.schema.properties[id];
        if (config && config.widget && config.widget.size) {
            return config.widget.size;
        }

        if (config && config.type === 'array') {
            return 24;
        } else {
            return 8;
        }
    }
}
