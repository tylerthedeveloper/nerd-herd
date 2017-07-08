import { NgModule } from '@angular/core';
import { MdButtonModule,  MdTabsModule, MdMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule ],
  exports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule ],
})
export class MaterialDesignModule { }