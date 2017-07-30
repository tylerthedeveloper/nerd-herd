import { Injectable } from "@angular/core";
import { UserService } from "../_services";
import { Observable } from 'rxjs/Observable';
import { Subject,  } from "rxjs/Subject";
import { User } from "../_models";
import { BehaviorSubject  } from "rxjs/Rx";
import { StateStore } from "./state.store";
import { AngularFireAuth } from "angularfire2/auth";
//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/asObservable';


@Injectable()
export class UserStore extends StateStore {

    //private _users: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([])); ////immutable
    private _users: BehaviorSubject<Array<User>>;
    //private location : any = [];
    public _location: Position;
    //loc: any;

    constructor(public afAuth: AngularFireAuth,
                public userService: UserService) {
        
                    super(afAuth, userService);
        
                    this._users = new BehaviorSubject([]);
                    this.location.subscribe((pos: Position) => { 
                             console.log("hiii");
                        
                        this._location = pos;
                        this.loadInitialData(pos.coords);
                    });
    }

    get users() : BehaviorSubject<User[]> {
        return this._users;
    }
    
    loadInitialData(coords: Coordinates) {
        //console.log(coords);
        var uarr = new Array<any>();
        console.log("LID");
        //this._users =  this.userService.getAllUsersByLocation(coords, 5000).toArray(); //.asObservable();
        
        this.userService.getAllUsersByLocation(coords, 5000).subscribe(
            res => {
                console.log("LID2");
                console.log("herrr " + JSON.stringify(res));
                //this._todos.next(List(todos));
                    //var x = this._users.getValue().push //.map((user : any) => new Array(user));
                this._users.next(this._users.getValue().concat(new Array(res))); //new Array(res));
            },
            err => console.log("Error retrieving location")
        );
        
    }
    /*
    loadInitialData() {
        this.userService.getAllUsers().subscribe(
            res => this._users.next(res),
            err => console.log("Error retrieving Todos")
        );
    }
    */
    storeSearchUserByName(userName : string): Observable<Array<User>> {
        let obs = this.userService.getUserByName(userName);
        obs.subscribe( res => this._users.next(res));
        return obs;
    }

    storeSearchUserByUserId(userName : string): Observable<Array<User>> {
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