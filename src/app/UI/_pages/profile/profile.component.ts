import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PostService, UserService } from '../../../_services/index';
import { Post, User } from "../../../_models/index";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  //alert("make a MD dialog component -> hello new user, please continue to update your profile!");
  _posts: Observable<any>;
  userModel = new User("","","","","");
  constructor(private route: ActivatedRoute, public userService: UserService, 
              private postService : PostService) {}

  ngOnInit() {
    let userUid : string = this.route.snapshot.paramMap.get('uid');
    this.userService.getUserByID(userUid).subscribe((user) => {
      this.userModel = user;
    });

    var nestedPosts = this.postService.getPostsByUserID(userUid)
     .flatMap(list => list)
      .map((data: any) => {
        console.log(data);       
        var innerKey = Object.keys(data)[0];       
        console.log(data[innerKey].author);       
      });

    this._posts = nestedPosts;
  }

  updateProfile() {
    this.userService.updateProfile(this.userModel);
  }
  
}
