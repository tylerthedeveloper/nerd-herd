import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ContactComponent }  from './UI/contact/contact.component';
import { NavBarComponent }  from './UI/nav/navbar.component';
import { PageHeaderComponent }  from './UI/templates/page-header/page-header.component';
import { SubscribeComponent }  from './UI/templates/subscribe/subscribe.component';
import { ProfileBoxComponent }  from './UI/cards/profile-box/profile-box.component';
import { BlogPostComponent }  from './UI/cards/blog-post/blog-post.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, NavBarComponent, ProfileBoxComponent,BlogPostComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
