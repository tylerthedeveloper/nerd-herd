import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
//import { ProfileService } from '../../../_services/profile.service'
import { UserStore } from '../../../_stores/user.store';
import { User } from '../../../_models/user';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'people-feed',
  templateUrl: './people-feed.html',
  providers: [ ProfileService ],
  styleUrls: ['./people-feed.css']
})


    
  

export class PeopleFeedComponent {
    users : Observable<User[]>;
    nameSubject: Subject<any>;

    //constructor(private userStore: UserStore) {
    constructor(private profileService: ProfileService) {
        this.nameSubject = new Subject();
        this.users = this.profileService.getAllUsers();

    }

    ngOnInit(): void {
    }


    onSearchUserByName(name: string) {
        this.userStore.searchUserByName(name);
    }

    onSearchUserById(name: string) {
        this.userStore.searchUserByUserId(name);

    getUserByName(name: string) {
        this.profileService.nameSubject.next(name);

    }
}
