import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
//import { ProfileService } from '../../../_services/profile.service'
import { UserStore } from '../../../_stores/user.store';
import { User } from '../../../_models/user';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'people-feed',
  templateUrl: './people-feed.html',
  //providers: [ ProfileService ]
})

export class PeopleFeedComponent {

    constructor(private userStore: UserStore) {
    }

    ngOnInit(): void {
    }

    onSearchUserByName(name: string) {
        this.userStore.SearchUserByName(name);
    }
}
