import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../_services/post.service'
import { Category, Post } from '../../../_models/post';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'post-feed',
  templateUrl: './post-feed.html',
  providers: [ PostService ],
  styleUrls: ['./post-feed.css']
})

export class PostFeedComponent {

    posts : Observable<Post[]>;
    private subject = new Subject<any>();

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.posts = this.postService.getAllPosts();
    }

    post(title: string, content: string) {
        this.postService.addPost(title, content, Category.Idea);
    }

    getPostsByUser(userID: string): void {
        this.posts = this.postService.getPostsByUserID(userID);
    }

    getPostsByCategory(category: string): void {
        this.posts = this.postService.getPostsByCategory(category);
    }

    private clearPost() : void {
    }
}
