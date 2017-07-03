import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../_services/auth.service';
//import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
//import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'home-page',
  templateUrl: './homepage.html'
})

export class HomeComponent {
  
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
