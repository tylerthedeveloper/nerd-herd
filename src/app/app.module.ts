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


//deprecated???
import { MaterialModule } from '@angular/material';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';

import { 
            AFService, FollowerService, GitService, HttpService, 
            PostService, ProjectService, UserService 
        } from './_services/index';
import { UserStore } from './_stores/user.store';
import { UIModule } from './UI/ui.app.module';

    // '@angular/cdk/table'???;
import { DataSource } from '@angular/cdk';


@NgModule({
    imports:[
        BrowserModule, AppRoutingModule, CommonModule,
        NgbModule.forRoot(), HttpModule, UIModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCwILuTSkNcFBP9LEjINztg2lKBcRdtAlY',
            libraries: ["places"]
        }), AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule, AngularFireDatabaseModule, MaterialModule
    ], 
    providers: [ 
                    AFService, FollowerService, HttpService, GitService,
                    ProjectService, PostService, UserService, 
                    UserStore 
                ],
    declarations: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
