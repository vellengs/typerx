import { NzTreeModule } from 'ng-tree-antd';
import { DataTableModule } from 'data-table/datatable';
import { CustomSchemaFormModule } from 'schema-forms/schema-forms.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonListComponent } from './list/common.list';
import { BaseListComponent } from './list/base.list';
import { TreeListComponent } from './selector/tree.list';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from './shared.module';
import { ListSearchComponent } from './selector/list.search';

const COMPONENTS = [
    DetailComponent,
    TreeListComponent,
    ListSearchComponent,
    BaseListComponent,
    CommonListComponent,
];

@NgModule({
    imports: [
        CustomSchemaFormModule,
        SharedModule,
        DataTableModule,
        NzTreeModule,
    ],
    declarations: [
        ...COMPONENTS
    ],
    entryComponents: [...COMPONENTS],
    exports: [
        ...COMPONENTS
    ]
})
export class CustomSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomSharedModule
        };
    }
}
