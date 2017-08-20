import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category, Post } from '../_models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { StateStore } from "../_stores/state.store";

declare var GeoFire: any;

@Injectable()
export class PostService {

    posts: FirebaseListObservable<any>;
    user: firebase.User;
    location: Position;
    firebaseRef : firebase.database.Reference;
    geoFire : any;
    geoFireRef : any;

    constructor(private db: AngularFireDatabase, 
                public afService : AFService,
                public userService : UserService) {
                
                this.posts = db.list('/posts');
                this.afService.getUser().subscribe(user => {
                    if(user) { 
                        this.user = user;
                        //if( !user.location ) --> get Firebase user !!!
                        this.afService.getOrUpdateUserLocation(user.uid).take(1).subscribe(location => { 
                            this.location = location;
                            console.log(location);
                        });

                    }
                });
      
                this.firebaseRef = firebase.database().ref('locations/posts');
                this.geoFire = new GeoFire(this.firebaseRef);
                this.geoFireRef = this.geoFire.ref(); 
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
    
        this.setPostLocation(postKey, this.location.coords);
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

    public getAllPostsByLocation(radius: number) : Observable<any> { //: FirebaseListObservable<any> { 

        let _coords = this.location.coords;

        var geoQuery = this.geoFire.query({
            center: [_coords.latitude, _coords.longitude],
            radius: radius //kilometers
        });

    
        return Observable.create((observer : any) => {
            var self = this.db;
            geoQuery.on("key_entered", function(key: any, location: any, distance: any) {
                self.object(`/posts/${key}`).subscribe(post => {
                    console.log(post);
                    observer.next(post);
                });
            })
        });
    }

    private getKeyByCategoryId(_category: string) {
        var cat = "";
        return Object.keys(Category).find(key => Category[key] === _category)
    }

    private setPostLocation(postKey: any, coords: Coordinates) {
        this.db.object(`posts/${postKey}`).update({                 
            latitude : coords.latitude,
            longitude : coords.longitude
        });
        
        this.geoFire.set(postKey, [coords.latitude, coords.longitude])
            .then(
                () => console.log("Provided key has been added to GeoFire") , 
                (error: any) => console.log("Error: " + error)
            );
    }

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
