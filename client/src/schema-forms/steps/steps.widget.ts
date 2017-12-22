import { DetailComponent } from '@shared/detail/detail.component';
import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlWidget } from 'angular2-schema-form';
import { FormProperty, ActionRegistry, PropertyGroup } from 'angular2-schema-form/dist/model';

@Component({
    selector: 'app-steps-widget',
    templateUrl: 'steps.widget.html'
})

// tslint:disable-next-line:component-class-suffix
export class StepsWidget extends ControlWidget implements OnInit, AfterViewInit {

    @Input() formProperty: PropertyGroup;
    control: FormControl = new FormControl('', () => null);

    current = 0;

    steps = [];
    fields = [];

    constructor(public parent: DetailComponent) {
        super();
        console.log('parent:', parent);
    }

    ngOnInit() {
        this.steps = this.schema.widget.steps || [];
        this.fields = this.schema.widget.parts[this.current];
    }

    pre() {
        this.current -= 1;
        this.stepChanged();
    }

    next() {
        this.current += 1;
        this.stepChanged();
    }

    done() {
        // this._message.success('done');
        if (this.parent && this.parent.save) {
            this.parent.save();
        }
    }

    stepChanged() {

        if (this.schema.widget.parts) {
            this.fields = this.schema.widget.parts[this.current];
        }

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


    ngAfterViewInit() {

    }
}
