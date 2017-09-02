import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
//import { ProfileService } from '../../../_services/profile.service'
import { UserStore } from '../../../_stores/user.store';
import { User } from '../../../_models/user';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'people-feed',
  templateUrl: './people-feed.html',
  //providers: [ ProfileService ],
  styleUrls: ['./people-feed.css']
})


export class PeopleFeedComponent {
    //users : Observable<User[]>;
    nameSubject: Subject<any>;
    loc: any;
    //constructor(private profileService: ProfileService) {
    constructor(private userStore: UserStore) {
        this.nameSubject = new Subject();
        //this.users = this.profileService.getAllUsers();
        //this.loc = this.userStore.location;
    }

    ngOnInit(): void {
        //console.log("loc from feed " + this.loc);
    }


    onSearchUserByName(name: string) {
        this.userStore.storeSearchUserByName(name);
    }

    onSearchUserById(name: string) {
        this.userStore.storeSearchUserByUserId(name);
    }
    //getUserByName(name: string) {
      //  this.profileService.nameSubject.next(name);
    //}
}
