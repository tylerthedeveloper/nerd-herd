import { NgModule } from '@angular/core';
import { 
          MdButtonModule,  MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, 
          MdGridListModule, MdTableModule, MdSidenavModule 
        } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, MdGridListModule, MdTableModule, MdSidenavModule ],
  exports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule, MdGridListModule, MdTableModule, MdSidenavModule ],
})
export class MaterialDesignModule { }
