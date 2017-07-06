import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../_services/post.service'
import { Post } from '../../_models/post';

@Component({
  selector: 'post-feed',
  templateUrl: './post-feed.html',
  providers: [ PostService ]
})

export class PostFeedComponent {

    //postTitle: string;
    posts : Observable<Post[]>;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        //this.postTitle  = "";
        this.posts = this.postService.posts;
    }

    post(title: string, content: string) {
        this.postService.addPost(title, content);
        //this.clearPost();
    }

    private clearPost() : void {
        //this.postTitle = "";
    }
}
