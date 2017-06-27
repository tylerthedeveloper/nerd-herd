import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'home-page',
  templateUrl: './homepage.html'
})

export class HomeComponent {
    
    constructor(private authService: AuthService) {}

}
