import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UMeditorModule } from 'ngx-umeditor';
import { SettingsPageComponent } from './settings/settings';

const routes: Routes = [
    { path: 'settings', component: SettingsPageComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        UMeditorModule,
    ],
    declarations: [
        SettingsPageComponent
    ],
    entryComponents: [
        SettingsPageComponent
    ],
    exports: [
        RouterModule
    ]
})

export class SystemModule { }

async function sleep(msec: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, msec);
    });
}
