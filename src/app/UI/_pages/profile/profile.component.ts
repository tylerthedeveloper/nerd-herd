import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/index';
import { Post, User } from "../../../_models/index";
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  //alert("make a MD dialog component -> hello new user, please continue to update your profile!");
  userModel = new User("","","","","");
  constructor(private route: ActivatedRoute, public userService: UserService) {}

  ngOnInit() {
    let userUid : string = this.route.snapshot.paramMap.get('uid');
    this.userService.getUserByID(userUid).subscribe((user) => {
      this.userModel = user;
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.userModel);
  }
  
}
