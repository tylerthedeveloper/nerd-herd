import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../_services/auth.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
//import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'home-page',
  templateUrl: './homepage.html'
})

export class HomeComponent {
  
  //users: FirebaseListObservable<any>;
  user: Observable<firebase.User>;
  usersRef = firebase.database().ref('users');
  rootDbRef = firebase.database().ref();

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;
    //this.users = db.list('/users');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
        var token = result.credential.accessToken; // This gives you a Google Access Token. 
        var user = result.user; // The signed-in user info.      
        
        firebase.database().ref('/users/' + user.uid).set({
          name: user.displayName,
          email: user.email,
        });
    }).catch(function (error) {
      //var errorCode = error.code;
      var errorMessage = error.message;
     });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
