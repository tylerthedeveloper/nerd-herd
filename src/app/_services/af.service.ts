import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { User } from '../_models/user';

@Injectable()
export class AFService {
  
    //user: Observable<firebase.User>;
    user: firebase.User;
    appUser: User;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
        // this.user = afAuth.authState;
        // this.appUser = new User(afAuth.auth.currentUser.displayName, 
        //                         afAuth.auth.currentUser.email,
        //                         "",
        //                         afAuth.auth.currentUser.photoURL,
        //                         afAuth.auth.currentUser.uid,
        //                         {});
        afAuth.authState.subscribe( user => {
            this.user = user;
            this.appUser = new User(afAuth.auth.currentUser.displayName, 
                                afAuth.auth.currentUser.email,
                                "",
                                afAuth.auth.currentUser.photoURL,
                                afAuth.auth.currentUser.uid,
                                {});
        });
    }

    //getUser(): Observable<firebase.User> {
    getUser(): firebase.User {
        return this.user;
    }

    getAppUser(): User {
        return this.appUser;
    }

    //login user with google auth on firebase
    loginWithGoogle() : firebase.Promise<any> {    
            return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( (result) => {
                var token = result.credential.accessToken; // This gives you a Google Access Token. 
                var user = result.user; // The signed-in user info.
                this.addUser(user).then( () => this.router.navigate(['/people']));
                // this.addUser(user).then( () => this.router.navigate(['/profile', user.uid]));
        }).catch(function (error) {
            alert( error.name + " : " + error.message + " : " + error.stack);
        });
        }

        
    logout() : firebase.Promise<any> {
        return this.afAuth.auth.signOut().then(() => this.router.navigate(['/posts']));
    }

    // add google info to db
    private addUser(user: any) : firebase.Promise<any> {
        let _user = { 
                name: user.displayName,          
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid,
        };
        return firebase.database().ref(`users/${user.uid}`)
                .update({_user })
                .then(() => this.router.navigate(['/posts']));
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