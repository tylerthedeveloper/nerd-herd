import { NgModule } from '@angular/core';
import { MdButtonModule,  MdTabsModule, MdMenuModule, MdCardModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule ],
  exports: [ BrowserAnimationsModule, MdButtonModule, MdTabsModule, MdMenuModule, MdCardModule, MdInputModule ],
})
export class MaterialDesignModule { }
