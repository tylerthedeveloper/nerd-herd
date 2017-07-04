import { Component } from '@angular/core';
import { AFService } from '../../../_services/af.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile-box',
  templateUrl: './profile-box.html',
})
export class ProfileBoxComponent {
    
    user: Observable<firebase.User>;
    constructor(public afService : AFService) {
        this.user = this.afService.getUser(); //.subscribe(user => this.user = user);
    }
}