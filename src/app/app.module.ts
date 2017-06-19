import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppComponent }  from './app.component';
import { ContactComponent }  from './UI/contact/contact.component';

import { GoogleMapComponent }  from './UI/google-map/google-map.component';
import { NavBarComponent }  from './UI/nav/navbar.component';
import { PageHeaderComponent }  from './UI/templates/page-header/page-header.component';
import { SubscribeComponent }  from './UI/templates/subscribe/subscribe.component';
import { ProfileBoxComponent }  from './UI/cards/profile-box/profile-box.component';
import { BlogPostComponent }  from './UI/cards/blog-post/blog-post.component';

@NgModule({
  imports:      [ BrowserModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCwILuTSkNcFBP9LEjINztg2lKBcRdtAlY',
                    libraries: ["places"]
                  })],
  declarations: [ AppComponent, NavBarComponent, ProfileBoxComponent,BlogPostComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }