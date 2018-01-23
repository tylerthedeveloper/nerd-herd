import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AFService } from '../../../_services/af.service';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'nav-bar',
  styleUrls: ['./navbar.css'],
  templateUrl: './navbar.html',
  providers: [ AFService ]
})

export class NavBarComponent {
  navx ='<sign-up></sign-up>';
  loggedIn : boolean;
  user: firebase.User;
  public currentPage: string = "posts";
  constructor(public afService : AFService, private router: Router) {
    let user = this.afService.getUser();
    if (user != null) this.loggedIn = true;
    else this.loggedIn = false;
  }

  // call auth service to logout
  login() : firebase.Promise<any> {
    return this.afService.loginWithGoogle();
  }

  // call auth service to logout
  logout() : firebase.Promise<any> {
    return this.afService.logout();
  }

  changePage(nextPage: string) {
      document.getElementById(this.currentPage).style.textDecoration = "none";
      this.currentPage = nextPage;
      document.getElementById(this.currentPage).style.textDecoration = "underline";
  }

}
