import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {
  ChatService, FollowerService, PostService,
  ProjectService, UserService, AFService
} from '../../../_services/index';
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
  chatRoom: string;

  _messages: Observable<any[]>;

  constructor(public userService: UserService,
    private postService: PostService,
    private projectService: ProjectService,
    private followerService: FollowerService,
    private afService: AFService,
    private route: ActivatedRoute,
    private chatService: ChatService) { }

  ngOnInit() {
    let userUid: string = this.route.snapshot.paramMap.get('uid');
    this._profileID = userUid;
    this.userService.getUserByID(userUid).subscribe((user) => this.userProfile = user);
    this._posts = this.postService.getPostsByUserID(userUid);
    this._projects = this.projectService.getProjectsByUserID(userUid);
    let stop = false;
    this.afService.getUser().subscribe(user => {
      this._userID = user.uid;
      console.log(this._userID);
      this.chatService.getChats(userUid, this._userID).subscribe(chatRoom => {
        console.log(chatRoom.node_.value_);
        this.chatRoom = chatRoom.node_.value_;
        if (this.chatRoom === undefined) this.chatRoom = this.chatService.createChat(userUid);
        this._messages = this.chatService.getMessagesByChatID(this.chatRoom);
      });
      this._fbUser = user;
    });
    this.followerService.getFollowers(userUid).subscribe(followers => {
      this._followers = followers;
      followers.forEach((follower: string) => {
        if (follower["id"] === this._userID) this.isFollowing = true;
      });
    });
    console.log(this._messages);
    this.followerService.getFollowing(userUid).subscribe(following => {
      this._following = following;
      //console.log(following);
    });
  }

  ///                 ///
  /// follow section  ///
  ///                 ///
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
    this.followerService.removeFollower(this._userID, this._profileID);
    this.isFollowing = false;
  }


  ///               ///
  /// chat section  ///
  ///               ///
  // getMessagesWithUser() {
  //   return this._messages;
  // }

  sendMessage(event : KeyboardEvent) {
    if (event.keyCode == 13) {
      var messageContent = (<HTMLInputElement>document.getElementById("messageContent")).value;
      (<HTMLInputElement>document.getElementById("messageContent")).value = '';
      var _message = {};
      _message["text"] = messageContent;
      _message["sender"] = this._userID;
      _message["recipient"] = this._profileID;
      _message["timestamp"] = firebase.database.ServerValue.TIMESTAMP;
      this.chatService.sendMessage(this.chatRoom, _message);
    }
  }

}