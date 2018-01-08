import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FollowerService, PostService, ProjectService, UserService, AFService } from '../../../_services/index';
import { Post, User } from "../../../_models/index";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-profile-page',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: User;
  _posts: Observable<any[]>;
  _projects: Observable<any[]>;
  _userID: string;
  _fbUser: firebase.User;
  _profileID: string;
  _followers: Observable<any>;
  _following: Observable<any>;
  isFollowing: boolean;
  constructor(public userService: UserService,
    private postService: PostService,
    private projectService: ProjectService,
    private followerService: FollowerService,
    private afService: AFService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    let userUid: string = this.route.snapshot.paramMap.get('uid');
    this._profileID = userUid;
    this.userService.getUserByID(userUid).subscribe((user) => this.userProfile = user);
    this._posts = this.postService.getPostsByUserID(userUid);
    this._projects = this.projectService.getProjectsByUserID(userUid);
    this.followerService.getFollowers(userUid).subscribe(followers => {
      this._followers = followers;
      console.log(followers);
      this.afService.getUser().subscribe(user => {
        this._userID = user.uid;
        this._fbUser = user;
        followers.forEach((follower: string) => {
          //check if already following
          console.log(follower);
          if (follower["id"] === user.uid) this.isFollowing = true;
        });
      });
    });
    this.followerService.getFollowing(userUid).subscribe(following => {
      this._following = following;
      console.log(following);
    });
  }

  followUser() {
    var followerData = {
      id: this._userID,
      name: this._fbUser.displayName,
      photoUrl: this._fbUser.photoURL
    };

    var followeeData = {
      id: this._profileID,
      name: this.userProfile.name,
      photoUrl: this.userProfile.photoUrl
    };
    this.followerService.addFollower(followerData, followeeData);
    this.isFollowing = true;
  }

  unfollowUser() {
    this.followerService.addFollower(this._userID, this._profileID);
    this.isFollowing = false;
  }

}