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
            //this.addUser(user).then( () => this.router.navigate(['/posts']));
            this.addUser(user).then( () => this.router.navigate(['/profile', user.uid]));
      }).catch(function (error) {
        alert( error.name + " : " + error.message + " : " + error.stack);
      });
    }

    
    logout() : firebase.Promise<any> {
      return this.afAuth.auth.signOut().then(() => this.router.navigate(['/posts']));
    }

    // add google info to db
    private addUser(user: any) : firebase.Promise<any> {
        return firebase.database().ref(`users/${user.uid}`).update({ 
                name: user.displayName,          
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid,
        }).then(() => this.router.navigate(['/posts']));
    }

    public getOrUpdateUserLocation(uid : string) : Observable<any> {
        if(navigator.geolocation) {      
            return Observable.create((observer : any) => {
                navigator.geolocation.getCurrentPosition(position => {
                    observer.next(position);
                });
            });
        }
    }
}

            /*



                    firebase.database().ref(`users/${uid}`).update({ 
                            latitude : position.coords.latitude,
                            longitude : position.coords.latitude
                    });


        var location;         
        if(navigator.geolocation){
            var location : any = {
                    "latitude" :  "",
                    "longitude" : ""
            };
            navigator.geolocation.getCurrentPosition(position => {
                //this.location = position.coords;
                location = {
                    "latitude" : position.coords.latitude,
                    "longitude" : position.coords.longitude
                };
                console.log(location.latitude)
            return firebase.database().ref(`users/${user.uid}`).set({ 
                name: user.displayName,          
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid,
                latitude : location.latitude,
                longitude : location.longitude
            }).then(() => this.router.navigate(['/home']));
         });
        }
        else     {
            return firebase.database().ref(`users/${user.uid}`).set({ 
                name: user.displayName,          
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid
            }).then(() => this.router.navigate(['/home']));}
            */