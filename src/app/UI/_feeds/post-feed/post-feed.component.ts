import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../_services/post.service'
import { Category, Post } from '../../../_models/post';
import { Subject } from 'rxjs/Subject';
import { RadiusSearch } from "../../../constants/distance";
import { SearchOptions } from "../../../constants/search-options";
import { BehaviorSubject  } from "rxjs/Rx";


@Component({
    selector: 'post-feed',
    templateUrl: './post-feed.html',
    providers: [ PostService ],
    styleUrls: ['./post-feed.css']
})

export class PostFeedComponent {

    public posts : BehaviorSubject<Post[]>;
    //public posts : BehaviorSubject<Array<Post>>;
    private subject = new Subject<any>();

    //lists
    public postTypes : {value: string, viewValue: string }[] = [];
    public postButtonsArray : any = [];
    public postRadiusSearch : any = [];

    //active values
    public category : string = "";
    public selected : string = "postCategory_All";
    public selectedPostSearchValue: string;
    public selectdPostSearchRadius: number;
    public postSearchOptions : any = [];

    postFormControl = new FormControl('', [
        Validators.required]);

    constructor(public postService: PostService) {

        this.postTypes = Object.keys(Category).map(cat => {
            return { value: Category[cat], viewValue: cat };
        });

        this.postButtonsArray = Object.keys(Category).map(cat => {
            let iconType = "";
            if (cat == "Idea") {
                iconType="lightbulb-o";
            } else if (cat == "Meetup") {
                iconType="users";
            } else if (cat == "Social") {
                iconType="comments";
            } else if (cat == "Question") {
                iconType="question-circle";
            } else if (cat == "Interview Prep") {
                iconType="black-tie";
            } else {
                iconType="globe";
            }
            return { category: cat, id: Category[cat], iconType: iconType };
        });
        this.postButtonsArray.unshift({category: "All", id: "postCategory_All", iconType: "connectdevelop" });

        this.posts = new BehaviorSubject([]);
        this.postService.getAllPosts().subscribe(post => this.posts.next(post))

        this.postRadiusSearch = Object.keys(RadiusSearch).map(rad => {
            return { value: rad, viewValue: RadiusSearch[rad].text, radius: RadiusSearch[rad].radius };
        });

        this.postSearchOptions = Object.keys(SearchOptions).map(opt => {
            return { value: SearchOptions[opt], viewValue: opt };
        });

        this.selectedPostSearchValue = this.postSearchOptions[0].value;

    }

    ngOnInit(): void {}

    post(title: string, content: string, category: string) {
        this.postService.addPost(title, content, category);
    }

//
/// retrieval
//
    getPostsByUser(userID: string): void {
        //this.posts = this.postService.getPostsByUserID(userID);
        this.postService.getPostsByUserID(name).subscribe(post => this.posts.next(post));
    }

    getPostsByUserName(name: string): void {
        //this.posts = this.postService.getPostsByUserName(name);
        this.postService.getPostsByUserName(name).subscribe(post => this.posts.next(post));
    }

    getPostsByCategory(category: string): void {
        if (category !== "All") this.postService.getPostsByCategory(category).subscribe(post => this.posts.next(post))
        else this.postService.getAllPosts().subscribe(post => this.posts.next(post));
    }

    getPostsByUserTitle(title: string): void {
        // this.posts = this.postService.getPostsByUserTitle(title);
        this.postService.getPostsByUserTitle(title).subscribe(post => this.posts.next(post));        
    }

    getPostsByDistance(radius: number): void {
        this.posts.next([]);
        this.postService.getAllPostsByLocation(radius).subscribe(
            res => this.posts.next(this.posts.getValue().concat(new Array(res))),
            err => console.log("Error retrieving location")
        );
    }

//
/// helpers
//
    private clearPost() : void {}

    private handlePostSearch(searchType: string, text: string) { //, radiusLookUp: string) { 
        searchType = Object.keys(SearchOptions).find(c => SearchOptions[c] === searchType)
        console.log(searchType) 
        console.log(text) 
        
        switch(searchType) {
            case "Author":
                this.getPostsByUserName(text);
                break;
            case "Title":
                this.getPostsByUserTitle(text);
                break;
            case "Distance":
                this.getPostsByDistance(RadiusSearch[this.selectedPostSearchRadius].radius);                
                break;
            default: //should we do a default?
                break;
        }
    }

    public setCategory(category: any) {
        if (this.selected !== category.id) {
            document.getElementById(this.selected).style.backgroundColor = "#2e7c31";
            this.selected = category.id;
            document.getElementById(this.selected).style.backgroundColor = "#445963";
            this.getPostsByCategory(category.category);
        }
    }


}


///
/// relocated consants commented out below
///

  /*
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

    public postRadiusSearch = {
        "radius-0": "10 Miles",
        "radius-1": "20 Miles",
        "radius-2": "30 Miles",
        "radius-3": "50 Miles",
        "radius-4": "100 Miles",
        "radius-5": "All"
    };



    public postSearchOptions = [
        {value: 'author-0', viewValue: 'Author'},
        {value: 'title-1', viewValue: 'Title'},
        {value: 'distance-2', viewValue: 'Distance'}
    ];
    */
