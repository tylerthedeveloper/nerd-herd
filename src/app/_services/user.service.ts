import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class UserService {

  constructor(private database: AngularFireDatabase) {}

  getAllUsers() { 
      return this.database.list('/users');
  }

  updateProfile(user : User) : Observable<any> {
      return Observable.fromPromise(this.database.object(`/users/${user.uid}`).update(user));
  }

  getUserByID(uid : string)  {
    return this.database.object(`/users/${uid}`).take(1);
  }

  getUserByName(name : string)  {
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
}
