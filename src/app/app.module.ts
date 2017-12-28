import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import {AppRoutingModule} from './app-routing.module';

import {ModalModule} from 'ngx-bootstrap/modal';

import {AppComponent} from './app.component';
import {SignUpApplyComponent} from './auth/sign-up-apply/sign-up-apply.component';
import {SignUpActivateComponent} from './auth/sign-up-activate/sign-up-activate.component';
import {SignUpEarlyAccessComponent} from './auth/sign-up-early-access/sign-up-early-access.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {NotFoundComponent} from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpApplyComponent,
    SignUpActivateComponent,
    SignUpEarlyAccessComponent,
    SignInComponent,
    NotFoundComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
