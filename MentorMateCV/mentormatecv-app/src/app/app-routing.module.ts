import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginFormComponent} from './auth/components/login-form/login-form.component';
import {RegisterFormComponent} from './auth/components/register-form/register-form.component';
import {HomeComponent} from './home/home.component';
import {MainInformationComponent} from './main-information/main-information.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {IsLoggedGuard} from './auth/guards/isLogged.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'register-form',
    component: RegisterFormComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component: MainInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
