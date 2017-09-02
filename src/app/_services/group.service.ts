import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GroupCategory, Group } from '../_models/group';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from '../_services/af.service';

@Injectable()
export class GroupService {
    
    groups: FirebaseListObservable<any>;
    user: firebase.User;
    location: Position;

    constructor(private db: AngularFireDatabase, public afService : AFService) {
        this.groups = db.list('/groups');
        this.afService.getUser().subscribe(user => {
            if(user) { 
                this.user = user;
                //if( !user.location ) --> get Firebase user !!!
                this.afService.getOrUpdateUserLocation(user.uid).take(1).subscribe(location => { this.location = location;
                    console.log(location);
                });
            }
        });
    }

    createGroup(groupname: string, creator: string, pictureUrl: string, groupCategory: GroupCategory) { 
            ////
        ///temp value!!!!!  
        groupCategory = GroupCategory.Development;
        /////
        ///
        var groupData = {  
            groupname: this.user.uid,            
            creator: this.user.displayName,
            pictureUrl: pictureUrl,
            groupCategory: groupCategory
        }

        var groupKey = this.db.database.ref("/groups").push().key;
        this.db.database.ref(`groups/${groupKey}`).set(groupData);
        
        this.db.database.ref(`users/${this.user.uid}/groups`).child(groupname).set(true);
        //.update(projectData);
    }
    

    //deleteGroup(key: string) {    
        //this.groups.remove(key); 
    //}

    //getMyGroups(userID : string): Observable<any> {
      //  var userGroupArray = this.db.object(`users/${this.user.uid}/groups`);
            //for loop?
                    //iterate and lazy load the groups / thumbnail / name ... 
    //}
}