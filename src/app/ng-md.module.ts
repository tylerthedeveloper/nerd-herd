import { NgModule } from '@angular/core';
import { 
          MdButtonModule,  MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, 
          MdGridListModule, MdTableModule, MdSidenavModule, MdSelectModule
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, MdGridListModule, MdTableModule, MdSidenavModule, MdSelectModule ],
  exports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, MdGridListModule, MdTableModule, MdSidenavModule, MdSelectModule ]
})
export class MaterialDesignModule { }
