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
  //_posts : Observable<Post[]>;
  _posts: Observable<any>;
  userModel = new User("","","","","");
  constructor(private route: ActivatedRoute, public userService: UserService, 
              private postService : PostService) {}

  ngOnInit() {
    let userUid : string = this.route.snapshot.paramMap.get('uid');
    this.userService.getUserByID(userUid).subscribe((user) => {
      this.userModel = user;
    });



    var x = this.postService.getPostsByUserID(userUid)
             .flatMap(list => list)
                      .map(keyContainer => { 
                        console.log(Object.keys(keyContainer))
                        return keyContainer[0]["author"] } );

       console.log(x)                 
    var nestedPosts = this.postService.getPostsByUserID(userUid)
     .flatMap(list => list)
      .map((data: any) => {
        for(var key in data) {
          var infoJSON = data[key];
          //console.log(infoJSON.author);
          //return JSON.parse(Object.keys(data)[0]);   
          return Array(infoJSON);
        }
      })
    this._posts = nestedPosts;
  }

  updateProfile() {
    this.userService.updateProfile(this.userModel);
  }
  
}
