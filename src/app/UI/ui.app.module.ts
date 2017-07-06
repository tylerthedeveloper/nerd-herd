import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialDesignModule } from '../ng-md.module';

import { NavBarComponent, GoogleMapComponent, ContactComponent, HomeComponent, PostFeedComponent, ProjectFeedComponent } from './index';
import { PageHeaderComponent, SubscribeComponent } from './templates/index';
import { ProfileBoxComponent, BlogPostComponent, ProjectPostComponent } from './cards/index';

@NgModule({
    imports : [CommonModule, NgbModule.forRoot(), MaterialDesignModule],
    declarations:  [ NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                  PostFeedComponent, ProjectFeedComponent, ProjectPostComponent ],
    exports: [ NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                PostFeedComponent, ProjectFeedComponent, ProjectPostComponent, CommonModule,
                 NgbModule, MaterialDesignModule],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }