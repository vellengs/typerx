import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UMeditorModule } from 'ngx-umeditor';
import { ApiModule } from 'generated';
import { PagesPageComponent } from './pages/pages';
import { ArticlesPageComponent } from './articles/articles';
const routes: Routes = [
    { path: 'pages', component: PagesPageComponent },
    { path: 'articles', component: ArticlesPageComponent },

];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        UMeditorModule,
    ],
    declarations: [
        PagesPageComponent,
        ArticlesPageComponent,
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})

export class CmsModule { } 
