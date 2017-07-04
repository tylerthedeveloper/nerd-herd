import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.html',
})
export class BlogPostComponent {
  @Input() author : string;
  @Input() title : string;
  @Input() content : string;

}
