import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PostService, ProjectService, UserService } from '../../../_services/index';
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

  _posts : Observable<any[]>;
  _projects : Observable<any[]>;
  userProfile : User;

  /*
  set profile(userProfile: User) {
    this.userProfile = userProfile;
    console.log("setter");
  }
  get profile(): User { return this.userProfile; }
  */

  constructor(public userService: UserService,
              private postService : PostService,
              private projectService : ProjectService,
              private route: ActivatedRoute) {}

  ngOnInit() {
      let userUid : string = this.route.snapshot.paramMap.get('uid');
      this.userService.getUserByID(userUid).subscribe((user) => {
          this.userProfile = user;
      });
      this._posts = this.postService.getPostsByUserID(userUid);
      this._projects = this.projectService.getProjectsByUserID(userUid);
  }

}
