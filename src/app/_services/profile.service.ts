import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProfileService {

  nameSubject: Subject<any>;

  constructor(private database: AngularFireDatabase) { 
        this.nameSubject = new Subject();
  }

  getAllUsers() { 
      return this.database.list('/users');
  }

  updateProfile(user : User) {
      this.database.object('/users/' + user.uid).update(user);
  }

  getUserFromDb(uid : string)  {
    return this.database.object(`/users/${uid}`).take(1);
  }
}
