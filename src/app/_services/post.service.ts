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

    addPost(title: string, content: string) {  // , author: string) {
        this.posts.push({
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

    getPostsByUser(userID : string): Observable<any> {
        return this.db.list('/posts', {
            query: {
                        orderByChild: "authorID",
                        equalTo: userID
                    }
            });
    }
}
/*
import { Injectable,  } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../_models/post';

import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PostService {

 //   private postUrl = '/api/posts';
	private postUrl = API_URL + '/api/posts';

    constructor(private http: Http) { }

    getAll() :  Observable<Post[]>{
        return this.http.get(this.postUrl, this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.postUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(post: Post) {
        return this.http.post(this.postUrl, post, this.jwt()).map((response: Response) => response.json());
    }

    update(post: Post) {
        return this.http.put(this.postUrl + '/' + post.id, post, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.postUrl + '/'  + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
*/
