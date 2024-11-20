
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CallbackComponent } from './shared/features/callback/callback.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'callback', component: CallbackComponent },
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouterModule { }
