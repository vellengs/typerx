import { Component, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {
    ActionRegistry, ValidatorRegistry, SchemaPreprocessor,
    FormPropertyFactory, Action, FormProperty
} from 'angular2-schema-form/dist/model';
import { WidgetFactory } from 'angular2-schema-form/dist/widgetfactory';
import { SchemaValidatorFactory, ZSchemaValidatorFactory, FormComponent, Validator } from 'angular2-schema-form';
import { useFactory } from 'angular2-schema-form/dist/form.component';
import { TerminatorService } from 'angular2-schema-form/dist/terminator.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nz-schema-form',
    template: `
      <form nz-form>
        <nz-form-element
                *ngIf="rootProperty" [formProperty]="rootProperty"></nz-form-element>
      </form>`,
    providers: [
        ActionRegistry,
        ValidatorRegistry,
        SchemaPreprocessor,
        WidgetFactory,
        {
            provide: SchemaValidatorFactory,
            useClass: ZSchemaValidatorFactory
        }, {
            provide: FormPropertyFactory,
            useFactory: useFactory,
            deps: [SchemaValidatorFactory, ValidatorRegistry]
        },
        TerminatorService,
    ]
})
export class NzSchemaComponent implements OnChanges {
    @Input() schema: any = null;

    @Input() model: any;

    @Input() actions: { [actionId: string]: Action } = {};

    @Input() validators: { [path: string]: Validator } = {};

    @Output() onChange = new EventEmitter<{ value: any }>();

    @Output() isValid = new EventEmitter<boolean>();

    @Output() onErrorChange = new EventEmitter<{ value: any[] }>();

    @Output() onErrorsChange = new EventEmitter<{ value: any }>();

    rootProperty: FormProperty = null;

    constructor(private formPropertyFactory: FormPropertyFactory,
        private actionRegistry: ActionRegistry,
        private validatorRegistry: ValidatorRegistry,
        private cdr: ChangeDetectorRef,
        private terminator: TerminatorService, ) {

        // super(formPropertyFactory, actionRegistry, validatorRegistry, cdr, terminator, )
    }

    ngOnChanges(changes: any) {
        if (changes.validators) {
            this.setValidators();
        }

        if (changes.actions) {
            this.setActions();
        }

        if (this.schema && !this.schema.type) {
            this.schema.type = 'object';
        }

        if (this.schema && changes.schema) {
            if (!changes.schema.firstChange) {
                this.terminator.destroy();
            }
            SchemaPreprocessor.preprocess(this.schema);
            this.rootProperty = this.formPropertyFactory.createProperty(this.schema);

            this.rootProperty.valueChanges.subscribe(value => {
                this.onChange.emit({ value: value });
            });
            this.rootProperty.errorsChanges.subscribe(value => {
                this.onErrorChange.emit({ value: value });
                this.isValid.emit(!(value && value.length));
            });
        }

        if (this.schema && (changes.model || changes.schema)) {
            this.rootProperty.reset(this.model, false);
            this.cdr.detectChanges();
        }
    }

    private setValidators() {
        this.validatorRegistry.clear();
        if (this.validators) {
            for (const validatorId in this.validators) {
                if (this.validators.hasOwnProperty(validatorId)) {
                    this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                }
            }
        }
    }

    private setActions() {
        this.actionRegistry.clear();
        if (this.actions) {
            for (const actionId in this.actions) {
                if (this.actions.hasOwnProperty(actionId)) {
                    this.actionRegistry.register(actionId, this.actions[actionId]);
                }
            }
        }
    }

    public reset() {
        this.rootProperty.reset(null, true);
    }
}
