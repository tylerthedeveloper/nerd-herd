import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

declare var GeoFire: any;

@Injectable()
export class UserService {

    firebaseRef : firebase.database.Reference;
    geoFire : any;
    geoFireRef : any;

  constructor(public database: AngularFireDatabase) {
      this.firebaseRef = firebase.database().ref('locations');
      this.geoFire = new GeoFire(this.firebaseRef);
      this.geoFireRef = this.geoFire.ref(); 

  }

  getAllUsers() : FirebaseListObservable<any> { 
      return this.database.list('/users');
  }

  updateProfile(user : User) : Observable<any> {
      return Observable.fromPromise(this.database.object(`/users/${user.uid}`).update(user));
  }

  getUserByID(uid : string) : Observable<any> {
    return this.database.object(`/users/${uid}`).take(1);
  }

  getUserByName(name : string) : Observable<any> {
      if(name !== "") { 
        return this.database.list('/users', {
          query: {
            orderByChild: 'name',
            equalTo: name
          }
        }).take(1);
    }
    else return this.getAllUsers();
  }

  getAllUsersByLocation(location: any, radius: number) : FirebaseListObservable<any> { 
    var geoQuery = this.geoFire.query({
        center: [location.latitude, location.longitude],
        radius: radius //kilometers
      });

    var userLocs : Array<string> = [];
            console.log("hiii");
   
    return Observable.create((observer : any) => {
        var self = this.database;
        geoQuery.on("key_entered", function(key: any, location: any, distance: any) {
            //userLocs.push(key);  
            console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            observer.next(self.object(`/users/${key}`).take(1));
        })});

    //var userLocs : Array<string> = [];
    //return this.database.list('/users');
  }

  public getOrUpdateUserLocation(uid : string) : Observable<any> {
    if(navigator.geolocation) {      
        return Observable.create((observer : any) => {
                console.log("pub get or update  1");
          
            navigator.geolocation.getCurrentPosition(position => {
                //observer.next(position);
                console.log("pub get or update  2");
                //this.updateLocation(uid, position.coords);
            });
        });
    }
  }
  
  private updateLocation(userKey: any, coords: Coordinates) {
    //firebase.database().ref(`users/${uid}`).update({ 
    
    /*
      this.database.object(`users/${userKey}`).update({                 
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
    });
      */
    console.log("2222pub get or update")

  
    // 39.9601469,-86.0903699
    /*
    geoFire.set(userKey, [coords.latitude, coords.longitude]).then(function() {
        console.log("Provided key has been added to GeoFire");
    }, function(error : any) {
        console.log("Error: " + error);
    });
      */

    /*
    geoFire.get(userKey).then(function(location : any) {
      if (location === null) {
        console.log("Provided key is not in GeoFire");
      }
      else {
        console.log("Provided key has a location of " + location);
      }
    }, function(error : any) {
      console.log("Error: " + error);
    });
    */

  }
}