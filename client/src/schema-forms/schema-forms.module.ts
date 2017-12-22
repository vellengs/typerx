import { GridWidget } from './grid/grid.widget';
import { ToggleWidget } from './toggle/toggle.widget';
import { DomainWidget } from './domain/domain.widget';

import {
    WidgetRegistry, WidgetChooserComponent, FormComponent, FormElementComponentAction,
    FormElementComponent, DefaultWidgetRegistry, SchemaValidatorFactory, ZSchemaValidatorFactory, SchemaFormModule
} from 'angular2-schema-form';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzTreeModule } from 'ng-tree-antd';
import { NzFormElementComponent } from './element/element.component';

import { SelectWidget } from './select/select.widget';
import { RadioWidget } from './radio/radio.widget';
import { TextAreaWidget } from './textarea/textarea.widget';
import { IntegerWidget } from './integer/integer.widget';
import { FileWidget } from './file/file.widget';
import { CheckboxWidget } from './checkbox/checkbox.widget';
import { ObjectWidget } from './object/object.widget';
import { RangeWidget } from './range/range.widget';
import { ButtonWidget } from './button/button.widget';
import { ArrayWidget } from './array/array.widget';
import { PickerWidget } from './picker/picker.widget';
import { TableWidget } from './table/table.widget';
import { DictWidget } from './dict/dict.widget';
import { DatetimeWidget } from './datetime/datetime.widget';
import { BooleanWidget } from './boolean/boolean.widget';
import { QueryWidget } from './query/query.widget';
import { EntryWidget } from './entry/entry.widget';
import { DateWidget } from './date/date.widget';
import { SearchWidget } from './search/search.widget';
import { InputWidget } from './input/input.widget';
import { ListWidget } from './list/list.widget';
import { StringWidget } from './string/string.widget';
import { CustomWidgetRegistry } from './widget-registry';
import { RateWidget } from './rate/rate.widget';
import { NzSchemaComponent } from './form/form.component';
import { TreeWidget } from './tree/tree.widget';
import { SelectSearch } from './select-search/select.search';
import { ColumnSettingsWidget } from './column-settings/column.settings.widget';
import { DateRangeWidget } from './date-range/date.range.widget';
import { NzFormElementAtrr } from './element/element';

import { StepsWidget } from './steps/steps.widget';
import { DataTableModule } from 'data-table/datatable';
import { TabsWidget } from 'schema-forms/tabs/tabs.widget';
import { TimeWidget } from 'schema-forms/time/time.widget';

const moduleProviders = [
    {
        provide: WidgetRegistry,
        useClass: CustomWidgetRegistry
    },
    {
        provide: SchemaValidatorFactory,
        useClass: ZSchemaValidatorFactory
    }
];

const widgets = [
    ArrayWidget,
    ButtonWidget,
    ObjectWidget,
    CheckboxWidget,
    InputWidget,
    FileWidget,
    IntegerWidget,
    TextAreaWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    StringWidget,
    ListWidget,
    SearchWidget,
    NzSchemaComponent,
    NzFormElementComponent,
    RateWidget,
    DateWidget,
    DatetimeWidget,
    EntryWidget,
    QueryWidget,
    BooleanWidget,
    DictWidget,
    TableWidget,
    PickerWidget,
    TreeWidget,
    SelectSearch,
    ColumnSettingsWidget,
    DateRangeWidget,
    DomainWidget,
    ToggleWidget,
    NzFormElementAtrr,
    StepsWidget,
    GridWidget,
    TabsWidget,
    TimeWidget,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NzTreeModule,
        SchemaFormModule,
        DataTableModule,
    ],
    declarations: [
        ...widgets
    ],
    entryComponents: [
        ...widgets
    ],
    exports: [
        ...widgets
    ]
})
export class CustomSchemaFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomSchemaFormModule,
            providers: [...moduleProviders]
        };
    }
}
