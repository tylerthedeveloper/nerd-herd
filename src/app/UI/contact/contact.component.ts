import { Component } from '@angular/core';
import { PageHeaderComponent } from '../templates/page-header/page-header.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.html',
})
export class ContactComponent {
  pageTitle: string = 'Contact us';
  bgImageUrl = 'https://demot-vertigostudio.netdna-ssl.com/hestia/wp-content/themes/hestia/assets/img/header.jpg';
}
