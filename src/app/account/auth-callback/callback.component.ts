import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  template: ``
})
export class CallbackComponent {

  constructor(private authService: AuthService) {
    this.authService.handleAuth();
  }
}