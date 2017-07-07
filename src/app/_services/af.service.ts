import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Injectable()
export class AFService {
  
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  getUser(): Observable<firebase.User> {
      return this.user;
  }

  //login user with google auth on firebase
  loginWithGoogle() : firebase.Promise<any> {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( (result) => {
          var token = result.credential.accessToken; // This gives you a Google Access Token. 
          var user = result.user; // The signed-in user info.      
          this.addUser(user);
          /* firebase.database().ref('users/' + user.uid).set({ 
              name: user.displayName,          
              email: user.email,
              photoUrl: user.photoURL,
              uid: user.uid }); */
          this.router.navigate(['/profile', user.uid]);
      }).catch(function (error) {
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert( errorMessage );
      });
    }

    
    logout() : firebase.Promise<any> {
      return this.afAuth.auth.signOut();
    }

    // add or update user to db
    private addUser(user: any) : void {
        firebase.database().ref('users/' + user.uid).set({ // add to db
            name: user.displayName,          
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid
        });
    }
}
