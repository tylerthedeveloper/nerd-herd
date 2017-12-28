import { NgModule, NO_ERRORS_SCHEMA }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../ng-md.module';
import { RouterModule, Router } from '@angular/router';

import { NavBarComponent, GoogleMapComponent } from './index';
import { PostFeedComponent, ProjectFeedComponent, PeopleFeedComponent } from './_feeds/index';
import { ContactComponent, HomeComponent, ProfileComponent, UserProfileComponent } from './_pages/index';
import { PageHeaderComponent, SubscribeComponent } from './_templates/index';
import { BlogPostComponent, ProjectPostComponent, UserFeedCardComponent } from './_cards/index';
import { DialogComponent, FriendsListComponent, ProfileBoxComponent } from './components/index';
import { CdkTableModule } from '@angular/cdk';

@NgModule({
    imports : [
                    CommonModule,
                    NgbModule.forRoot(),
                    MaterialDesignModule,
                    RouterModule, 
                    FormsModule, 
                    CdkTableModule
            ],
    declarations:  [ 
                        //pages
                        HomeComponent,
                        PostFeedComponent, 
                        ProfileComponent,
                        UserFeedCardComponent, 
                        ProjectFeedComponent, 
                        UserProfileComponent,
                        ContactComponent, 

                        //small components
                        NavBarComponent, 
                        ProfileBoxComponent,
                        BlogPostComponent, 
                        SubscribeComponent, 
                        PageHeaderComponent, 
                        GoogleMapComponent,
                        ProjectPostComponent, 
                        PeopleFeedComponent, 
                        FriendsListComponent,
                        DialogComponent
                    ],
    exports: [ 
                    //angular modules
                    RouterModule, 
                    FormsModule,
                    CommonModule,
                    NgbModule, 
                    MaterialDesignModule, 

                    //pages
                    HomeComponent,
                    ContactComponent, 
                    PostFeedComponent, 
                    ProjectFeedComponent, 
                    ProfileComponent, 
                    UserProfileComponent,

                    //helpers
                    NavBarComponent, 
                    ProfileBoxComponent,
                    SubscribeComponent, 
                    BlogPostComponent,
                    PageHeaderComponent, 
                    GoogleMapComponent,
                    ProjectPostComponent, 
                    UserFeedCardComponent, 
                    PeopleFeedComponent, 
                    FriendsListComponent,
                    DialogComponent
                ],
    //--entryComponents: [DialogComponent],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
