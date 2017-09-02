import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

declare var GeoFire: any;

@Injectable()
export class LocationService {

    firebaseRef : firebase.database.Reference;
    geoFire : any;
    geoFireRef : any;

  constructor(public database: AngularFireDatabase) {
      this.firebaseRef = firebase.database().ref('locations');
      this.geoFire = new GeoFire(this.firebaseRef);
      this.geoFireRef = this.geoFire.ref(); 

  }

public getOrUpdateUserLocation(uid : string) : Observable<any> {
    if(navigator.geolocation) {      
        return Observable.create((observer : any) => {
            navigator.geolocation.getCurrentPosition(position => {
                observer.next(position);
                this.updateLocation(uid, position.coords);
            });
        });
    }
    else {
        return Observable.create((observer : any) => 
        {
            this.database.object(`users/${uid}`).subscribe(user => 
            {
                if (user.latitude && user.longitude)
                    return observer.next(
                    {
                        "latitude": user.latitude,
                        "longitude": user.longitude
                    })              
            })
        })
    }
  }

  public getAllUsersByLocation(location: any, radius: number) : Observable<any> { //: FirebaseListObservable<any> { 
      var geoQuery = this.geoFire.query({
          center: [location.latitude, location.longitude],
          radius: radius //kilometers
        });

   
    return Observable.create((observer : any) => {
        var self = this.database;
        geoQuery.on("key_entered", function(key: any, location: any, distance: any) {
              //console.log(key + " entered query at " + location + " (" + distance + " km from center)");
              self.object(`/users/${key}`).subscribe(user => {
              //console.log(user);
              observer.next(user);
            });
        })});
  }

  
  
  private updateLocation(userKey: any, coords: Coordinates) {
      this.database.object(`users/${userKey}`).update({                 
        latitude : coords.latitude,
        longitude : coords.longitude
    });
      
    //console.log("2222pub get or update")

      // 39.9601469,-86.0903699
    this.geoFire.set(userKey, [coords.latitude, coords.longitude])
          .then(
            () => console.log("Provided key has been added to GeoFire") , 
            (error: any) => console.log("Error: " + error)
          );

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