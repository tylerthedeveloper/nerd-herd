import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category, Post } from '../_models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {

    posts: FirebaseListObservable<any>;
    user: firebase.User;
    location: Position;

    constructor(private db: AngularFireDatabase, 
                public afService : AFService,
                public userService : UserService) {
                
                this.posts = db.list('/posts');
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

    getAllPosts(): Observable<any> {
        return this.db.list('/posts', { query: { orderByChild: 'timestamp' }});
    }
    
    addPost(title: string, content: string, category: string) {
        
        ////
        ///temp value!!!!!
        /////
        ///
        var postData = {  
            authorID: this.user.uid,            
            author: this.user.displayName,
            title: title,
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            category: category
        }
        var catstring = this.getKeyByCategoryId(category);
        var postKey = this.db.database.ref("/posts").push().key;
        this.db.database.ref(`posts/${postKey}`).set(postData);
        this.db.database.ref(`user-posts/ids/${this.user.uid}/${postKey}`).set(postData);
        this.db.database.ref(`user-posts/names/${this.user.displayName}/${postKey}`).set(postData);
        this.db.database.ref(`post-categories/${catstring}/${postKey}`).set(postData);
    }

    
    updatePost(key: string, newText: string) {
        this.posts.update(key, { text: newText });
    }

    deletePost(key: string) {    
        this.posts.remove(key); 
    }

    getPostsByUserID(userID : string): Observable<any> {
        return this.db.list(`/user-posts/ids/${userID}`);
    }

    getPostsByUserName(name : string): Observable<any> {
        /*
        Observable.create((observer : any) => {
            this.userService.getUserByName(name).first().subscribe(user => {
                //console.log(user[0].uid);
                observer.next(new Array(this.db.list(`/user-posts/${user[0].uid}`)));        
            });
        });
        */
        return this.db.list(`/user-posts/names/${name}`);        
        
    }

    getPostsByCategory(category : string): Observable<any> {
        return this.db.list(`/post-categories/${category}`);
    }
    
    getPostsByUserTitle(title : string): Observable<any> {
        if(title !== "") { 
            return this.db.list('/posts', {
            query: {
                orderByChild: 'title',
                equalTo: title
            }
            }).take(1);
        }
    }

    private getKeyByCategoryId(_category: string) {
        var cat = "";
        return Object.keys(Category).find(key => Category[key] === _category)
    }

        /*
    private getCategoryString(category: string) : string {
        switch(category) {
            case Category.Project:
                return "project";
            case Category.News:
                return "news";
            case Category.Question:
                return "question";
            case Category.Idea:
                return "idea";
            case Category.Meetup:
                return "meetup";
        }
        return "idea";
    }
        */
}
