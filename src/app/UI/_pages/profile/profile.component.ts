import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PostService, ProjectService, UserService } from '../../../_services/index';
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
  //_posts: Observable<any>;
  _posts : Observable<any[]>;
  _projects : Observable<any[]>;
  userModel = new User("","","","","");
  constructor(private route: ActivatedRoute, public userService: UserService,
              private postService : PostService,
              private projectService : ProjectService) {}

  ngOnInit() {
    let userUid : string = this.route.snapshot.paramMap.get('uid');
    this.userService.getUserByID(userUid).subscribe((user) => {
      this.userModel = user;
    });

    this._posts = this.postService.getPostsByUserID(userUid);
    this._projects = this.projectService.getProjectsByUserID(userUid);

  }

  updateProfile() {
    this.userService.updateProfile(this.userModel);
    this.edit = false;
  }

  public edit = false;
  editProfile(): void {
   this.edit = true;
  }

}

    /*

    var nestedPosts = this.postService.getPostsByUserID(userUid)

      .map((list) => list.map((data : any ) => {
          console.log(Object.keys(data)[0]);
        }
      ));
    this._posts = nestedPosts;
    // let nestedPosts2 = this.postService.getPostsByUserID(userUid);
    // let nestedPosts2Obs = nestedPosts2.map(keyContainer => JSON.parse(Object.keys(keyContainer)[0]));

    this._posts = this.postService.getPostsByUserID(userUid)
                      .map(data => {
                         for(var key in data)
                        console.log(data[key]);
                        //console.log(Object.keys(keyContainer)[0])
                        //var infoJSON = data[key];
                        return JSON.parse(Object.keys(data)[0])});
*/

/*

        let collection: Array<any> = [];
    var nestedPosts = this.postService.getPostsByUserID(userUid)
     .flatMap(list => list)
      .map((data: any) => {
        //console.log(data);
        //var innerKey = Object.keys(data)[0];
        collection.push(Object.keys(data)[0]);
        //console.log(data[innerKey]);
        //console.log(data[innerKey]["author"]);
        //return data[innerKey];
      }) //.subscribe(posts => this._posts = posts);
      //alert(nestedPosts);
    //this._posts = Array(nestedPosts);
    //this._posts = Observable.of(collection);
    */
    //this._posts = this.postService.getAllPosts();









/* Beach

  Beach
  how was it
  it was nice
  ...
  ...
  ..
  t
  j
  t
  j
  jos
*/

/* current project status
  t
  j
  y
  j
  t
  j
  tj
*/

/* biking
  workout
  questions
  t
  tj
  t
  j
  tj
*/
