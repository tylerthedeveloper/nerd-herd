import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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


import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { AuthService, PostService, AFService } from './_services/index';
import { UIModule } from './UI/ui.app.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, CommonModule, 
                  NgbModule.forRoot(), HttpModule, UIModule,
                  AgmCoreModule.forRoot({
                      apiKey: 'AIzaSyCwILuTSkNcFBP9LEjINztg2lKBcRdtAlY',
                      libraries: ["places"]
                    }), AngularFireModule.initializeApp(environment.firebase), 
                    AngularFireAuthModule, AngularFireDatabaseModule,  MaterialModule
 ],
  providers: [ PostService, AuthService, AFService ],
  declarations: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }