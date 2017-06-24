
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
//import { LoginComponent } from './UI/account/login/login.component';

import { ContactComponent } from './UI/contact/contact.component';
import { HomeComponent } from './UI/homepage/homepage.component';
import { SignUpComponent } from './UI/account/sign-up/sign-up.component';

const appRoutes: Routes = [
//    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },    
    //{ path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
 //   { path: '**', redirectTo: '' }
];
 
 @NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

//export const routing = RouterModule.forRoot(appRoutes);

export class AppRoutingModule {}
