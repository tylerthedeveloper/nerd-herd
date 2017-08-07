import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { UIModule } from '../UI/ui.app.module';

import { LoggerService } from './logger.service';
//import { NavComponent } from './nav/nav.component';
 
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule.forRoot(), 
    HttpModule,
    UIModule,
    BrowserModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NgbModule, //.forROot() 
    HttpModule,
    UIModule,
    BrowserModule
  ],
  //declarations: [NavComponent],
  providers: [LoggerService]
})


export class CoreModule { }