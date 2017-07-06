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

    constructor(db: AngularFireDatabase, public afService : AFService) {
        this.projects = db.list('/projects');
        this.afService.getUser().subscribe(user => this.user = user);
    }

    addProject(title: string, content: string) {  // , author: string) {
        this.projects.push({ 
            authorID: this.user.uid,            
            author: this.user.displayName,
            title: title,
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP
            /*
            id: 1,
            date: string;
            picture: string;
            tags : Category[];
            */
        });
    }

    updateProject(key: string, newText: string) {
        this.projects.update(key, { text: newText });
    }

    deletePost(key: string) {    
        this.projects.remove(key); 
    }
}