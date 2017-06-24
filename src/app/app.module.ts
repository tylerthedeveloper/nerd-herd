import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

//import { routing }        from './app-routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';

import { NavBarComponent, GoogleMapComponent, ContactComponent, HomeComponent } from './UI/index';
import { SignUpComponent }  from './account/sign-up/sign-up.component';
import { PageHeaderComponent, SubscribeComponent } from './UI/templates/index';
import { ProfileBoxComponent, BlogPostComponent } from './UI/cards/index';
//import { HomeComponent } from './UI/homepage/homepage.component';
//import { ContactComponent }  from './UI/contact/contact.component';
//import { GoogleMapComponent }  from './UI/google-map/google-map.component';
//import { NavBarComponent }  from './UI/nav/navbar.component';
//import { ProfileBoxComponent }  from './UI/cards/profile-box/profile-box.component';
//import { BlogPostComponent }  from './UI/cards/blog-post/blog-post.component';
//import { PageHeaderComponent }  from './UI/templates/page-header/page-header.component';
//import { SubscribeComponent }  from './UI/templates/subscribe/subscribe.component';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, NgbModule.forRoot(), HttpModule,
                  AgmCoreModule.forRoot({
                      apiKey: 'AIzaSyCwILuTSkNcFBP9LEjINztg2lKBcRdtAlY',
                      libraries: ["places"]
                    }),
                  ],
  declarations: [ AppComponent, NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                  SignUpComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }