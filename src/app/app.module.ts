import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignUpApplyComponent } from './auth/sign-up-apply/sign-up-apply.component';
import { SignUpActivateComponent } from './auth/sign-up-activate/sign-up-activate.component';
import { SignUpEarlyAccessComponent } from './auth/sign-up-early-access/sign-up-early-access.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpApplyComponent,
    SignUpActivateComponent,
    SignUpEarlyAccessComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
