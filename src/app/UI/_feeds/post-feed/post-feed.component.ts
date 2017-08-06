import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../_services/post.service'
import { Post } from '../../../_models/post';
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
    postTypes = [
        {value: 'other-0', viewValue: 'Other'},
        {value: 'question-0', viewValue: 'Question'},
        {value: 'interview-1', viewValue: 'Interview Prep'},
        {value: 'social-2', viewValue: 'Social'},
        {value: 'conference-3', viewValue: 'Conference'}
    ];
    postTypeSearch = [
        {value: 'other-0', viewValue: 'All'},
        {value: 'question-0', viewValue: 'Question'},
        {value: 'interview-1', viewValue: 'Interview Prep'},
        {value: 'social-2', viewValue: 'Social'},
        {value: 'conference-3', viewValue: 'Conference'}
    ];
    postRadiusSearch = [
        {value: 'radius-0', viewValue: '10 Miles'},
        {value: 'radius-1', viewValue: '20 Miles'},
        {value: 'radius-2', viewValue: '30 Miles'},
        {value: 'radius-3', viewValue: '50 Miles'},
        {value: 'radius-4', viewValue: '100 Miles'},
        {value: 'radius-5', viewValue: 'All'}
    ];

    category = "";

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.posts = this.postService.getAllPosts();
    }

    post(title: string, content: string) {
        this.postService.addPost(title, content);
    }

    getPostsByUser(userID: string): void {
        this.posts = this.postService.getPostsByUserID(userID);
    }

    private clearPost() : void {
    }

    setCategory(category: string) {
        if (this.category) {
            document.getElementById(this.category).style.backgroundColor="#2e7c31";
            this.category = category;
            document.getElementById(category).style.backgroundColor="#445963"
        } else {
            this.category = category;
            document.getElementById(category).style.backgroundColor="#445963"
        }
    }
}
