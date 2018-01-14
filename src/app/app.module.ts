import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { EventService } from './event-wall/event.service';
import { EventWallComponent } from './event-wall/event-wall.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';
import { UserComponent } from './event-wall/user/user.component';
import { ManagerComponent, RegisterEventComponent } from './event-wall/manager/manager.component';
import { AdminComponent, RegisterEventAdminComponent, ConfirmChangesComponent } from './event-wall/admin/admin.component';
import { AllEventsComponent } from './event-wall/all-events/all-events.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'event-wall',
    component: EventWallComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventWallComponent,
    SignupComponent,
    UserComponent,
    ManagerComponent,
    AdminComponent,
    AllEventsComponent,
    RegisterEventComponent,
    RegisterEventAdminComponent,
    ConfirmChangesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot()
  ],
  providers: [LoginService, EventService, SignupService],
  entryComponents: [RegisterEventComponent, RegisterEventAdminComponent, ConfirmChangesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
