import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProjectCategory, Project } from '../_models/project';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { StateStore } from "../_stores/state.store";
import { User } from '../_models/user';

declare var GeoFire: any;

@Injectable()
export class ProjectService {

    projects: FirebaseListObservable<any>;
    //user: firebase.User;
    user: User;
    location: Position;
    firebaseRef : firebase.database.Reference;
    geoFire : any;
    geoFireRef : any;

    constructor(private db: AngularFireDatabase, 
                public afService : AFService,
                public userService : UserService) {
                
                this.projects = db.list('/projects');
                let _user = this.afService.getAppUser();
                if(_user) { 
                    this.user = _user;
                    this.afService.getOrUpdateUserLocation(_user.uid).take(1).subscribe(location => { 
                        this.location = location;
                    });
                }
      
                this.firebaseRef = firebase.database().ref('locations/projects');
                this.geoFire = new GeoFire(this.firebaseRef);
                this.geoFireRef = this.geoFire.ref(); 
    }

    getAllProjects(): Observable<any> {
        return this.db.list('/projects', { query: { orderByChild: 'timestamp' }});
    }
    
    addProject(title: string, content: string, category: string) {        
        var projectData = {  
            authorID: this.user.uid,            
            author: this.user.name,
            title: title,
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            category: category
        }
        var catstring = this.getKeyByCategoryId(category);
        var projectKey = this.db.database.ref("/projects").push().key;
        this.db.database.ref(`projects/${projectKey}`).set(projectData);
        this.db.database.ref(`user-projects/ids/${this.user.uid}/${projectKey}`).set(projectData);
        this.db.database.ref(`user-projects/names/${this.user.name}/${projectKey}`).set(projectData);
        this.db.database.ref(`project-categories/${catstring}/${projectKey}`).set(projectData);
        this.setProjectLocation(projectKey, this.location.coords);
    }

    addGitProject(gitData : {}) {
        console.log(gitData);
        var catstring = this.getKeyByCategoryId(gitData["category"]);
        var projectKey = this.db.database.ref("/projects").push().key;
        this.db.database.ref(`projects/${projectKey}`).update(gitData);
        this.db.database.ref(`user-projects/ids/${this.user.uid}/${projectKey}`).update(gitData);
        this.db.database.ref(`user-projects/names/${this.user.name}/${projectKey}`).update(gitData);
        this.db.database.ref(`project-categories/${catstring}/${projectKey}`).update(gitData);
        this.setProjectLocation(projectKey, this.location.coords);
    }

    updateProject(key: string, newText: string) {
        this.projects.update(key, { text: newText });
    }

    deleteProject(key: string) {    
        this.projects.remove(key); 
    }

    getProjectsByUserID(userID : string): Observable<any> {
        return this.db.list(`/user-projects/ids/${userID}`);
    }

    getProjectsByUserName(name : string): Observable<any> {
        /*
        Observable.create((observer : any) => {
            this.userService.getUserByName(name).first().subscribe(user => {
                //console.log(user[0].uid);
                observer.next(new Array(this.db.list(`/user-projects/${user[0].uid}`)));        
            });
        });
        */
        return this.db.list(`/user-projects/names/${name}`);        
        
    }

    getProjectsByCategory(category : string): Observable<any> {
        return this.db.list(`/project-categories/${category}`);
    }
    
    getProjectsByUserTitle(title : string): Observable<any> {
        if(title !== "") {
            return Observable.create((observer : any) => {
                var self = this.db;
                this.db.list('/projects', {
                    query: {
                        orderByChild: 'title',
                        equalTo: title
                    }
                }).subscribe(project => observer.next(project));
            });
        }
    }

    public getAllProjectsByLocation(radius: number) : Observable<any> { //: FirebaseListObservable<any> { 

        let _coords = this.location.coords;
        var geoQuery = this.geoFire.query({
            center: [_coords.latitude, _coords.longitude],
            radius: radius //kilometers
        });

        return Observable.create((observer : any) => {
            var self = this.db;
            geoQuery.on("key_entered", function(key: any, location: any, distance: any) {
                self.object(`/projects/${key}`).subscribe(project => observer.next(project));
            });
        });
    }

    private getKeyByCategoryId(_category: string) {
        return Object.keys(ProjectCategory).find(key => ProjectCategory[key] === _category);
    }

    private setProjectLocation(projectKey: any, coords: Coordinates) {
        this.db.object(`projects/${projectKey}`).update({                 
            latitude : coords.latitude,
            longitude : coords.longitude
        });
        
        this.geoFire.set(projectKey, [coords.latitude, coords.longitude])
            .then(
                () => console.log("Provided key has been added to GeoFire") , 
                (error: any) => console.log("Error: " + error)
            );
    }
}