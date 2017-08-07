import { Injectable } from "@angular/core";
import { UserService } from "../_services";
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { User } from "../_models";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class StateStore {

    protected userFBAuth : Observable<firebase.User>;
    protected userID : string;
    protected userFBCustom : Observable<User>;
    public location: Observable<any>;

    constructor(protected afAuth: AngularFireAuth, 
                protected userService: UserService) {

                    this.initializeStore();
    
    }

     public initializeStore() : void {
                let localAuth = this.afAuth.auth.currentUser;
                let localAuthID = localAuth.uid;
                this.location = this.userService.getOrUpdateUserLocation(localAuthID).take(1);
                //this.userService.getOrUpdateUserLocation(localAuthID).take(1).subscribe(location => this.location = location);
                this.userFBAuth = Observable.create(localAuth); 
                this.userID = localAuthID;
                this.userFBCustom = this.userService.getUserByID(localAuth.uid).take(1).map(user => user.json() as User);
    }
}