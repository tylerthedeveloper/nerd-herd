import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../_services/post.service'
import { Post } from '../../_models/post';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  providers: [ PostService ]
})

export class FeedComponent {

    posts : Observable<Post[]>;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
      //this.postService.getAll() ..? (heroes => this.heroes = heroes);
      //this.posts = this.postService.getAll();
        this.postService.getAll().subscribe(posts => {
          this.posts = posts;
        });
    }


}
