import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'page-header',
  templateUrl: './page-header.html'
})
export class PageHeaderComponent {
    @Input() title:string;
}
