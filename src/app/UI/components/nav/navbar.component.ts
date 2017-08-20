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
    this.afService.getUser().subscribe(
      (auth) => {
        this.user = auth;
        if (auth != null) this.loggedIn = true;
        else this.loggedIn = false;
      });
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
      document.getElementById(this.currentPage).style.backgroundColor = "#60ac5d";
      this.currentPage = nextPage;
      document.getElementById(this.currentPage).style.backgroundColor = "#004f04";
  }

}
