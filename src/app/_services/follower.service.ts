import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
import { Subject } from 'rxjs/Subject';
import { StateStore } from "../_stores/state.store";

@Injectable()
export class FollowerService implements OnInit {

    _followers: FirebaseListObservable<any>;
    _following: FirebaseListObservable<any>;
    user: firebase.User;
    firebaseRef : firebase.database.Reference;

    constructor(private db: AngularFireDatabase, 
                public afService : AFService) {}

    ngOnInit(): void {
        this.afService.getUser().subscribe(user => {
            this.user = (user) ? user : null;
            let userID = user.uid;
            this._followers = this.db.list(`/follow/${userID}/followers`);
            this._following = this.db.list(`/follow/${userID}/following`);
            // this._followers = this.getFollowers(this.user.uid);
            // this._following = this.getFollowing(this.user.uid);
        });
    }

    getFollowers(userID : string): FirebaseListObservable<any> {
        return this.db.list(`/follow/${userID}/followers`);
        // return this._followers;
    }
    
    getFollowing(userID : string): FirebaseListObservable<any> {
        return this.db.list(`/follow/${userID}/following`);
        // return this._following;
    }
    
    addFollower(followerID: string, followingID: string) {
        var followKey = this.db.database.ref(`/follow/${followerID}`).push().key;
        this.db.database.ref(`/follow/${followerID}/following/${followKey}`).update({followingID : followingID})
        this.db.database.ref(`/follow/${followingID}/followers/${followKey}`).update({followerID : followerID})
    }

    removeFollower(followerID: string, followingID: string) {
        this._following.remove(followingID);
        //this.db.database.ref(`/follow/${followingID}/followers/`).update(followingID);
    }
}