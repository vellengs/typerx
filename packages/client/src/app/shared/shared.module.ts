import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { BaseListComponent } from './base/base.list.component';
import { BaseComponent } from './base/base.component';
import { BaseTableComponent } from './base/base.table.component';
import { BaseStandComponent } from './base/base.stand.component';
import { BaseTreeTableComponent } from './base/base.tree.table';
import { BaseDetailComponent } from './base/base.detail.component';
import { BaseSelectorComponent } from './base/base.selector';
import { BaseTreeSelectorComponent } from '@shared/base/base.tree.selector';

const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    NgxTinymceModule
];
// endregion

// region: your components & directives
const COMPONENTS = [
    BaseComponent,
    BaseListComponent,
    BaseTableComponent,
    BaseStandComponent,
    BaseTreeTableComponent,
    BaseDetailComponent,
    BaseSelectorComponent,
    BaseTreeSelectorComponent,
];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    entryComponents: [
        ...COMPONENTS,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        DelonACLModule,
        DelonFormModule,
        // i18n
        TranslateModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ]
})
export class SharedModule { }
