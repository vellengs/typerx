import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { Page500Component } from './pages/500/500.component';
import { Page404Component } from './pages/404/404.component';
import { LockComponent } from './pages/lock/lock.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { LoginComponent } from './pages/login/login.component';
import { ProUserRegisterResultComponent } from './pro/user/register-result/register-result.component';
import { ProUserRegisterComponent } from './pro/user/register/register.component';
import { ProUserLoginComponent } from './pro/user/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from '../layout/layout.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
// pro
import { ProUserLayoutComponent } from '../layout/pro/user/user.component';
import { ArticlesPageComponent } from 'app/routes/article/articles/articles';
export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            // { path: 'dashboard', component: ArticlesPageComponent },
            { path: 'dashboard', component: DashboardAnalysisComponent, data: { translate: 'dashboard_analysis' } },
            { path: 'article', loadChildren: './article/article.module#ArticleModule' },
            { path: 'system', loadChildren: './system/system.module#SystemModule' },

        ]
    },
    // pro 单页，存在此原因是体验更好，这样不必在首次Angular运行后还需要下载模块文件才会渲染成功
    {
        path: 'pro/user',
        component: ProUserLayoutComponent,
        children: [
            { path: 'login', component: ProUserLoginComponent },
            { path: 'register', component: ProUserRegisterComponent },
            { path: 'register-result', component: ProUserRegisterResultComponent }
        ]
    },
    // 单页不包裹Layout
    { path: 'register', component: RegisterComponent, data: { translate: 'register' } },
    { path: 'login', component: LoginComponent, data: { title: 'login' } },
    { path: 'forget', component: ForgetComponent, data: { translate: 'forget' } },
    { path: 'lock', component: LockComponent, data: { translate: 'lock' } },
    { path: '404', component: Page404Component },
    { path: '500', component: Page500Component },
    { path: '**', redirectTo: 'dashboard' }
];
