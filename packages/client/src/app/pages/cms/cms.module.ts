import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UMeditorModule } from 'ngx-umeditor';
import { ApiModule } from 'generated';
import { PagesPageComponent } from './pages/pages';
import { ArticlesPageComponent } from './articles/articles';
import { CategoriesPageComponent } from './categories/categories';
import { WidgetsPageComponent } from './widgets/widgets';
import { CustomPageComponent } from './custom/custom';
const routes: Routes = [
    { path: 'pages', component: PagesPageComponent },
    { path: 'articles', component: ArticlesPageComponent },
    { path: 'categories', component: CategoriesPageComponent },
    { path: 'widgets', component: WidgetsPageComponent },
    { path: 'custom/:id', component: CustomPageComponent },
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
        CategoriesPageComponent,
        WidgetsPageComponent,
        CustomPageComponent,
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})

export class CmsModule { } 
