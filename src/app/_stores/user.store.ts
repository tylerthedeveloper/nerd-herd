import { Injectable } from "@angular/core";
import { UserService } from "../_services";
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { User } from "../_models";
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class UserStore {

    //private _users: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([])); ////immutable
    //private _todos: BehaviorSubject<User[]>; 
    private _users: BehaviorSubject<User[]>;
    
    constructor(private userService: UserService) {
        this._users = new BehaviorSubject([]);
        this.loadInitialData();
    }

    get users() : BehaviorSubject<User[]> {
        return this._users;
    }

    loadInitialData() {
        this.userService.getAllUsers().subscribe(
            res => this._users.next(res),
            err => console.log("Error retrieving Todos")
        );
    }

    searchUserByName(userName : string): Observable<Array<User>> {
        let obs = this.userService.getUserByName(userName);
        obs.subscribe( res => this._users.next(res));
        return obs;
    }

    searchUserByUserId(userName : string): Observable<Array<User>> {
        let obs = this.userService.getUserByID(userName);
        obs.subscribe( res => this._users.next(Array(res)));
        return obs;
    }

    /*
    onGetUser(newUser : User): Observable<User> {
        let obs = this.userService.updateProfile(newUser);
        obs.subscribe(
                res => {
                    this._users.next(res);
                    //this._todos.next(res);
                });
        return obs;
    }
    */

    /*
    deleteTodo(deleted:Todo): Observable {
        let obs: Observable = this.todoBackendService.deleteTodo(deleted);

        obs.subscribe(
                res => {
                    let todos: List<Todo> = this._users.getValue();
                    let index = todos.findIndex((todo) => todo.id === deleted.id);
                    this._users.next(todos.delete(index));

                }
            );

        return obs;
    }
    */


}