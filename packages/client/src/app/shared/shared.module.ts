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
import { UserService } from '../services/user.service';
import { CanAdminProvide } from '../services/can.admin.provide';
import { CanAuthProvide } from '../services/can.auth.provide';
import { ApiModule, Configuration } from '../../generated';

const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    NgxTinymceModule
];
// endregion

// region: your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        ApiModule.forRoot(() => {
            const config = new Configuration();
            config.basePath = `${location.protocol}//${location.host}`;
            return config;
        }),
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
    ],
    providers: [
        UserService,
        CanAdminProvide,
        CanAuthProvide,
    ]
})
export class SharedModule { }
