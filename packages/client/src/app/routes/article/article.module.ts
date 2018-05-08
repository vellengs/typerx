import { NzTreeModule } from 'ng-tree-antd';
import { CategoriesPageComponent } from './categories/categories';
import { CustomSharedModule } from './../../shared/custom.shared.module';
import { SchemaFormModule } from 'angular2-schema-form';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CustomSchemaFormModule } from 'schema-forms/schema-forms.module';
import { DataTableModule } from 'data-table/datatable';
import { ArticlesPageComponent } from './articles/articles';


const routes: Routes = [
    { path: 'articles', component: ArticlesPageComponent },
    { path: 'categories', component: CategoriesPageComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        SchemaFormModule,
        CustomSchemaFormModule,
        CustomSharedModule,
        DataTableModule,
        NzTreeModule,
    ],
    declarations: [
        ArticlesPageComponent,
        CategoriesPageComponent
    ],
    exports: [
        RouterModule
    ]
})

export class ArticleModule { }
