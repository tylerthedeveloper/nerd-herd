import { NgModule, NO_ERRORS_SCHEMA }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../ng-md.module';
import { RouterModule, Router } from '@angular/router';

import { NavBarComponent, GoogleMapComponent, FeedTabComponent } from './index';
import { PostFeedComponent, ProjectFeedComponent, PeopleFeedComponent } from './_feeds/index';
import { ContactComponent, HomeComponent, ProfileComponent } from './_pages/index';
import { PageHeaderComponent, SubscribeComponent } from './_templates/index';
import { ProfileBoxComponent, BlogPostComponent, ProjectPostComponent, UserFeedCardComponent } from './_cards/index';

@NgModule({
    imports : [CommonModule, NgbModule.forRoot(), MaterialDesignModule, RouterModule, FormsModule ],
    declarations:  [ NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                  SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                  PostFeedComponent, ProjectFeedComponent, ProjectPostComponent, ProfileComponent,
                  UserFeedCardComponent, PeopleFeedComponent, FeedTabComponent],
    exports: [ NavBarComponent, ProfileBoxComponent,BlogPostComponent, HomeComponent,
                SubscribeComponent, ContactComponent, PageHeaderComponent, GoogleMapComponent,
                PostFeedComponent, ProjectFeedComponent, ProjectPostComponent, CommonModule,
                 NgbModule, MaterialDesignModule, ProfileComponent, RouterModule, FormsModule, 
                 UserFeedCardComponent, PeopleFeedComponent, FeedTabComponent],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }