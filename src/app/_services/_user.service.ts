import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
 
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

    private userUrl = API_URL + '/api/users';

    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get(this.userUrl, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get(this.userUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(this.userUrl, user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        //return this.http.put(this.userUrl + '/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete(this.userUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
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