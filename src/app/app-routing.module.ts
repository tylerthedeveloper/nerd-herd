
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent, HomeComponent, ProfileComponent } from './UI/_pages/index';
import { SignUpComponent } from './account/index';
//import { UIModule } from './UI/ui.app.module';

const appRoutes: Routes = [
//    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },    
    { path: 'profile/:uid', component: ProfileComponent },
    //{ path: 'feed', component: FeedComponent },
    //{ path: 'login', component: LoginComponent },
    //{ path: 'sign-up', component: SignUpComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '**', redirectTo: 'home' }
];
 
 @NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}

//export const routing = RouterModule.forRoot(appRoutes);