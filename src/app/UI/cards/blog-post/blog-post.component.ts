import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.html',
})
export class BlogPostComponent {
  @Input() author : string;
  //title = 'Contact us';
  //bgImageUrl = 'https://demot-vertigostudio.netdna-ssl.com/hestia/wp-content/themes/hestia/assets/img/header.jpg';
}
