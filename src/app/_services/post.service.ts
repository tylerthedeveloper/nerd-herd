import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { Post } from '../_models/post';
 
@Injectable()
export class PostService {

    private postUrl = '/api/posts';

    constructor(private http: Http) { }
 
    getAll() {
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