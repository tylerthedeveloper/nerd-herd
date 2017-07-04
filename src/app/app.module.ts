import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { environment } from '../environments/environment';

import 'hammerjs';
import { MaterialDesignModule } from './ng-md.module';
import { NavBarComponent, GoogleMapComponent, ContactComponent, HomeComponent, FeedComponent } from './UI/index';
import { SignUpComponent }  from './account/index';
import { PageHeaderComponent, SubscribeComponent } from './UI/templates/index';
import { ProfileBoxComponent, BlogPostComponent } from './UI/cards/index';
import { AuthService, PostService, AFService } from './_services/index';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, NgbModule.forRoot(), HttpModule,
                  AgmCoreModule.forRoot({
                      apiKey: 'AIzaSyCwILuTSkNcFBP9LEjINztg2lKBcRdtAlY',
                      libraries: ["places"]
                    }), AngularFireModule.initializeApp(environment.firebase),
                    AngularFireAuthModule, AngularFireDatabaseModule, MaterialDesignModule //MDBBootstrapModule.forRoot() 
                ],
  providers: [ PostService, AuthService, AFService ],
  declarations: [ AppComponent, NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                  SignUpComponent, FeedComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }