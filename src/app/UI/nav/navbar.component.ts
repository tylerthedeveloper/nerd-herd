import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AFService } from '../../_services/af.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.html',
  providers: [ AFService ]
})

export class NavBarComponent {
  navx ='<sign-up></sign-up>';  
  loggedIn : boolean;
  user: Observable<firebase.User>;
  constructor(public afService : AFService) {
    this.user = afService.user;
    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          //this.user = db.list.object('users/' + auth.uid);
          this.loggedIn = true;
        }
        else 
          this.loggedIn = false;        
      });  
  }
  
  login() {
    this.afService.loginWithGoogle();
    //this.loggedIn = true;
  }

  logout() {
    this.afService.logout();
    //this.loggedIn = false;
  }

}
