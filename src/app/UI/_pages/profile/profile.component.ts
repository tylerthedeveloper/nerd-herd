import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AFService } from '../../../_services/af.service';
import { AFService, ProfileService } from '../../../_services/index';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  private userUid : string;
  private _user: firebase.User;
  constructor(public afService : AFService, private route: ActivatedRoute,
              private database: AngularFireDatabase) {
   }
      //let currentUser = this.af.database.object('/Users/' + this._auth.uid).take(1).subscribe(user => {

  ngOnInit() {
    this.route.params.take(1).subscribe((params: any) => {
      let userId = params['uid'];
      this.userUid = params['uid'];
      console.log(userId);
    });
    /*
    this.afService.getUser().subscribe( (auth) => {
        this.user = auth;
      });
      */
       this.database.object('/users/' + this.userUid).subscribe((user) => {
          this._user = user;
       })
        
      //alert("make a MD dialog component -> hello new user, please continue to update your profile!");
  }

  updateProfile(git: string ) {
      this.database.object('/users/' + this._user.uid).update({
        gitUsername : git
      })
      
  }
}
