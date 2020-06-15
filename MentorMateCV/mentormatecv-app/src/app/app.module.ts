import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterFormComponent} from './auth/components/register-form/register-form.component';
import {LoginFormComponent} from './auth/components/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {MustMatchDirective} from './helpers/must-match.directive';
import {HomeComponent} from './home/home.component';
import {MainInformationComponent} from './main-information/main-information.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {IsLoggedGuard} from './auth/guards/isLogged.guard';
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SkillsComponent } from './main-information/components/skills/skills.component';
import { EducationComponent } from './main-information/components/education/education.component';
import { MainUserInformationComponent } from './main-information/components/main-user-information/main-user-information.component';
import { WorkExperienceComponent } from './main-information/components/work-experience/work-experience.component';
import { CertificatesComponent } from './main-information/components/certificates/certificates.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoadingSpinnerComponent,
    MustMatchDirective,
    HomeComponent,
    MainInformationComponent,
    ProfileComponent,
    SkillsComponent,
    EducationComponent,
    MainUserInformationComponent,
    WorkExperienceComponent,
    CertificatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AuthGuard,
    IsLoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
