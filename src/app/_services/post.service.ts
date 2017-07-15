import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../_models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from '../_services/af.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {

    posts: FirebaseListObservable<any>;
    user: firebase.User;

    private subject = new Subject<any>();
    constructor(private db: AngularFireDatabase, public afService : AFService) {
        this.posts = db.list('/posts');
        this.afService.getUser().subscribe(user => this.user = user);
    }

    addPost(title: string, content: string) {
        var postData = {  
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
        
        }
        var postKey = this.db.database.ref("/posts").push().key;
        this.db.database.ref(`posts/${postKey}`).set(postData);
        this.db.database.ref(`user-posts/${this.user.uid}/${postKey}`).set(postData);
    }

    updatePost(key: string, newText: string) {
        this.posts.update(key, { text: newText });
    }

    deletePost(key: string) {    
        this.posts.remove(key); 
    }

    getAllPosts(): Observable<any> {
        return this.db.list('/posts', {
            query: { orderByChild: 'timestamp' }});
        //return this.db.database.ref('/posts').limitToFirst(50);
    }

    getPostsByUserID(userID : string): Observable<any> {
        return this.db.list(`/user-posts/${this.user.uid}`);
    }
    /*
    getPostsByUser(userID : string): Observable<any> {
        return this.db.list('/posts', {
            query: { 
                        orderByChild: "authorID",
                        equalTo: userID
                    }
            });
    }
    */
}
