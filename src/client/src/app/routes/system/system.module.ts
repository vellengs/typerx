import { NzTreeModule } from 'ng-tree-antd';
import { CustomSharedModule } from './../../shared/custom.shared.module';
import { SchemaFormModule } from 'angular2-schema-form';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CustomSchemaFormModule } from 'schema-forms/schema-forms.module';
import { DataTableModule } from 'data-table/datatable';
import { SettingsPageComponent } from 'app/routes/system/settings/settings';
import { CommonListComponent } from '@shared/list/common.list';

const routes: Routes = [
    { path: 'settings', component: SettingsPageComponent },
    { path: 'accounts', component: CommonListComponent, data: { domain: 'account', title: '账号管理' } },
    { path: 'dicts', component: CommonListComponent, data: { domain: 'dict', title: '字典管理' } },
    { path: 'domain', component: CommonListComponent, data: { domain: 'domain', title: '域对象管理' } },
    { path: 'logs', component: CommonListComponent, data: { domain: 'log', title: '日志管理' } },
    { path: 'permission', component: CommonListComponent, data: { domain: 'permission', title: '权限管理' } },
    { path: 'menus', component: CommonListComponent, data: { domain: 'menu', title: '菜单管理' } },
    { path: 'roles', component: CommonListComponent, data: { domain: 'role', title: '角色管理' } },
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
        SettingsPageComponent
    ],
    exports: [
        RouterModule
    ]
})

export class SystemModule { }
