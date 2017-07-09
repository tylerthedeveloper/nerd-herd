import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './homepage.html'
})

export class HomeComponent {

  constructor(private router: Router){}

}
