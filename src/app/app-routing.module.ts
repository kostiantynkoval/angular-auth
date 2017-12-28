import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpApplyComponent } from './auth/sign-up-apply/sign-up-apply.component';
import { SignUpActivateComponent } from './auth/sign-up-activate/sign-up-activate.component';
import { SignUpEarlyAccessComponent } from './auth/sign-up-early-access/sign-up-early-access.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
      { path: 'apply', component: SignUpApplyComponent },
      { path: 'activate', component: SignUpActivateComponent },
      { path: 'early-access', component: SignUpEarlyAccessComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
