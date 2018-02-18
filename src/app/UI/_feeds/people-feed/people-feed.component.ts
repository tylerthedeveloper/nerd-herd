import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../../../_stores/user.store';
import { FollowerService, UserService, AFService } from '../../../_services/index';
import { User } from '../../../_models/user';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'people-feed',
  templateUrl: './people-feed.html',
  styleUrls: ['./people-feed.css']
})


export class PeopleFeedComponent {
    nameSubject: Subject<any>;
    loc: any;
    userID: string;
    followers: Observable<any>;
    following: Observable<any>;
    constructor(private userStore: UserStore,
        private route: ActivatedRoute,
        private afService: AFService,
        private followerService: FollowerService) {
        this.nameSubject = new Subject();
    }

    ngOnInit(): void {
        this.afService.getUser().subscribe(user => {
            this.userID = user.uid;
            this.followerService.getFollowers(this.userID).subscribe(followers => {
                this.followers = followers;
            });
            this.followerService.getFollowing(this.userID).subscribe(following => {
                this.following = following;
            });
        });
    }

    onSearchUserByName(name: string) {
        this.userStore.storeSearchUserByName(name);
    }

    onSearchUserById(name: string) {
        this.userStore.storeSearchUserByUserId(name);
    }
}
