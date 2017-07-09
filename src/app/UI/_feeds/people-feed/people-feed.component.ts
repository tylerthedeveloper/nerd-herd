import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../../../_services/profile.service'
import { User } from '../../../_models/user';

@Component({
  selector: 'people-feed',
  templateUrl: './people-feed.html',
  providers: [ ProfileService ]
})

export class PeopleFeedComponent {

    users : Observable<User[]>;

    constructor(private profileService: ProfileService) {
        this.users = this.profileService.getAllUsers();
    }


}
