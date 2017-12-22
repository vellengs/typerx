import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { routes } from './routes';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';


// pro
import { ProUserLoginComponent } from './pro/user/login/login.component';
import { ProUserRegisterComponent } from './pro/user/register/register.component';
import { ProUserRegisterResultComponent } from './pro/user/register-result/register-result.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { useHash: true }),
        PagesModule
    ],
    declarations: [
        DashboardMonitorComponent,
        DashboardAnalysisComponent,
        // pro
        ProUserLoginComponent,
        ProUserRegisterComponent,
        ProUserRegisterResultComponent
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule { }
