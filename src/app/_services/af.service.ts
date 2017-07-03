import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AFService {
  
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
        var token = result.credential.accessToken; // This gives you a Google Access Token. 
        var user = result.user; // The signed-in user info.      
        //this.addUser(user);
        firebase.database().ref('users/' + user.uid).set({ // add to db
          name: user.displayName,          
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid
      });
    }).catch(function (error) {
      //var errorCode = error.code;
      var errorMessage = error.message;
      alert( errorMessage );
     });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
