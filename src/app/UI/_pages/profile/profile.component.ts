import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GitService, HttpService, PostService, ProjectService, UserService, FollowerService } from '../../../_services/index';
import { Post, User, FollowerFriend } from "../../../_models/index";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material'; 
import { ConfirmDialogComponent, DialogComponent, ProjCatDialogComponent } from '../../components/index';

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
    userModel = new User("","","","","", {});
    _gitApi = "https://api.github.com/users/";
    dSource : string = "";
    _followers: Observable<any>;
    _following: Observable<any>;

    constructor(private route: ActivatedRoute,      public userService: UserService,
                private httpService : HttpService,  private githubService: GitService,
                private postService : PostService,  private projectService : ProjectService,
                private followerService: FollowerService,
                public dialog: MdDialog) {}

                
    ngOnInit() {
        let userUid : string = this.route.snapshot.paramMap.get('uid');
        this.userService.getUserByID(userUid).subscribe((user) => {
            this.userModel = user;
            if (this.userModel.gitUsername === "") {
                let dialogRef: MdDialogRef<DialogComponent>;
                dialogRef = this.dialog.open(DialogComponent);
                dialogRef.componentInstance.title = "Welcome User";
                dialogRef.componentInstance.content = 
                    "Please edit your profile on the left and " +
                    "enter your git username " + 
                    "to automatically import your projects";
                }
        });
        this._posts = this.postService.getPostsByUserID(userUid);
        this._projects = this.projectService.getProjectsByUserID(userUid);
        this.dSource = "testing title";
        // this.userService.getFollowers(userUid).map(followers => this.followerList = followers);
        // console.log(this.followerList);
        // this.userService.getFollowing(userUid).map(following => this.followingList = following);
        this.followerService.getFollowers(userUid).subscribe(followers => {
            this._followers = followers;
            // this.afService.getUser().subscribe(user => {
            //   this._userID = user.uid;
            //   this._fbUser = user;
            //   followers.forEach((follower: string) => {
            //     //check if already following
            //     console.log(follower);
            //     if (follower["followerID"] === user.uid) this.isFollowing = true;
            //   });
            // });
        });
        this.followerService.getFollowing(userUid).subscribe(following => {
            this._following = following;
            console.log(this._following);
        });
        // this._following = this.followerService.getFollowing(userUid);
    }

    updateProfile() {
        this.userService.updateProfile(this.userModel);
        this.edit = false;
        this.checkUpdateGitInfo();
    }
    
    checkUpdateGitInfo () {
        if (this.userModel.gitUsername != "") {
        //if (!this.userModel.gitInfo) {
            //this.githubService.gitGetRequest(this._gitApi + this.userModel.gitUsername)
            this.httpService
                .httpGetRequest(this._gitApi + this.userModel.gitUsername)
                .subscribe(res => {
                    let tempGit = {
                    "login" : res["login"],
                    "avatar_url" : res["avatar_url"],
                    "repos_url" : res["repos_url"],
                    "company" : res["company"],
                    "blog" : res["blog"],
                    "bio" : res["bio"]
                    };
                    this.userModel.gitInfo = tempGit;
                    this.userService.updateGitProfile(this.userModel.uid, tempGit);
                    this.getRepos(tempGit.repos_url);
                });
        //}
        } 
    }

    getRepos(url : string) {
        var confirmedRepos = Array<any>();      
        this.githubService
            .getAndParseRepos(url, this.userModel.uid)
            .forEach(repo => {
                console.log(repo);
                this.projectService.addGitProject(repo);
            });
        }

    public edit = false;
        editProfile(): void {
        this.edit = true;
    }
}

    /*
                    let dialogRef: MdDialogRef<DialogComponent>;
                    dialogRef = this.dialog.open(DialogComponent, {
                        data : {
                            title: "title",
                            content: "content"
                        }
                    });
            
                    dialogRef = this.dialog.open(DialogComponent);
                    dialogRef.componentInstance.title = "title";
                    dialogRef.componentInstance.content = "message";
                    */

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
        //this._posts = this.postService.getAllPosts();
        */







    /* 
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


    current project status
    t
    j
    y
    j
    t
    j
    tj


    biking
    workout
    questions
    t
    tj
    t
    j
    tj

    */