import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UMeditorModule } from 'ngx-umeditor';
import { ApiModule } from 'generated';
import { PagesPageComponent } from './pages/pages';
const routes: Routes = [
    { path: 'pages', component: PagesPageComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        UMeditorModule,
    ],
    declarations: [
        PagesPageComponent
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})

export class CmsModule { } 
