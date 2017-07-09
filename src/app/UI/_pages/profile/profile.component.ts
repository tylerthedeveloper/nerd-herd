import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../_services/index';
import { User } from '../../../_models/user';
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
  constructor(private route: ActivatedRoute, public profileService: ProfileService) {}

  ngOnInit() {
    let userUid : string = this.route.snapshot.paramMap.get('uid');
    this.profileService.getUserFromDb(userUid).subscribe((user) => {
      this.userModel = user;
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.userModel);
  }
  
}
