import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import {
    FormControl
} from '@angular/forms';
import { FormProperty, ActionRegistry } from 'angular2-schema-form/dist/model';
import { Widget } from 'angular2-schema-form';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nz-form-element',
    templateUrl: 'element.component.html',
    styles: [
        `
        .ant-form-item-label{
            width:90px;
        }
        `
    ]
})
export class NzFormElementComponent implements OnInit {

    private static counter = 0;

    @Input() formProperty: FormProperty;

    @Input() required = false;

    control: FormControl = new FormControl('', () => null);
    widget: Widget<any> = null;
    buttons = [];

    constructor(private actionRegistry: ActionRegistry) { }

    ngOnInit() {
        this.parseButtons();

        // console.log('tet:', this.formProperty);
    }

    private parseButtons() {
        if (this.formProperty && this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;

            for (const button of this.buttons) {
                this.createButtonCallback(button);
            }
        }
    }

    private createButtonCallback(button) {
        button.action = (e) => {
            let action;
            if (button.id && (action = this.actionRegistry.get(button.id))) {
                if (action) {
                    action(this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    }

    onWidgetInstanciated(widget: Widget<any>) {
        this.widget = widget;
        const id = 'field' + (NzFormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget['required'] = this.required;
        this.widget.control = this.control;
    }
}
