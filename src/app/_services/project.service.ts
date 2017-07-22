import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../_models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from '../_services/af.service';

@Injectable()
export class ProjectService {
    
    projects: FirebaseListObservable<any>;
    user: firebase.User;

    constructor(private db: AngularFireDatabase, public afService : AFService) {
        this.projects = db.list('/projects');
        this.afService.getUser().subscribe(user => this.user = user);
    }

    addProject(title: string, content: string) {  // , author: string) {
        var projectData = {  
            authorID: this.user.uid,            
            author: this.user.displayName,
            title: title,
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
        var projectKey = this.db.database.ref("/projects").push().key;
        this.db.database.ref(`projects/${projectKey}`).set(projectData);
        this.db.database.ref(`user-projects/${this.user.uid}/${projectKey}`).set(projectData);
    }
    

    updateProject(key: string, newText: string) {
        this.projects.update(key, { text: newText });
    }

    deletePost(key: string) {    
        this.projects.remove(key); 
    }

    getProjectsByUserID(userID : string): Observable<any> {
        return this.db.list(`/user-projects/${this.user.uid}`);
    }
}