import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../_services/post.service'
import { Category, Post } from '../../../_models/post';
import { Subject } from 'rxjs/Subject';
import { RadiusSearch } from "../../../constants/distance";
import { SearchOptions } from "../../../constants/search-options";

@Component({
    selector: 'post-feed',
    templateUrl: './post-feed.html',
    providers: [ PostService ],
    styleUrls: ['./post-feed.css']
})

export class PostFeedComponent {

    public posts : Observable<Post[]>;
    private subject = new Subject<any>();

    //lists
    public postTypes : {value: string, viewValue: string }[] = [];
    public postButtonsArray : any = [];
    public postRadiusSearch : any = [];

    //active values
    public category : string = "";
    public selectedPostSearchValue: string;
    public selectedPostSearchRadius: number;
    public postSearchOptions : any = [];

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
            console.log(cat);
            return { category: cat, id: Category[cat], iconType: iconType };
        });
        this.postButtonsArray.unshift({category: "All", id: "postCategory_All", iconType: "connectdevelop" });

        this.posts = this.postService.getAllPosts();

        this.postRadiusSearch = Object.keys(RadiusSearch).map(rad => {
            return { value: rad, viewValue: RadiusSearch[rad].text, radius: RadiusSearch[rad].radius };
        });

        this.postSearchOptions = Object.keys(SearchOptions).map(opt => {
            return { value: SearchOptions[opt], viewValue: opt };
        });

        this.selectedPostSearchValue = this.postSearchOptions[0].value;
    }

    ngOnInit(): void {
        //this.category = "All";
        //setTimeout(3000, function() {  document.getElementById("postCategory_All").style.backgroundColor = "#445963"; });

    }

    post(title: string, content: string) {
        this.postService.addPost(title, content, "Category.Idea");
    }

//
/// retrieval
//
    getPostsByUser(userID: string): void {
        this.posts = this.postService.getPostsByUserID(userID);
    }

    getPostsByUserName(name: string): void {
        this.posts = this.postService.getPostsByUserName(name);
    }

    getPostsByCategory(category: string): void {
        this.posts = (category !== "All")
            ? this.postService.getPostsByCategory(category)
            : this.posts = this.postService.getAllPosts();
    }

    getPostsByUserTitle(title: string): void {
        this.posts = this.postService.getPostsByUserTitle(title);
    }

//
/// helpers
//
    private clearPost() : void {}

    public handlePostSearch(searchType: string, text: string, radiusLookUp: string) {
        switch(searchType) {
            case "author-0":
                this.getPostsByUserName(text);
                break;
            case "title-1":
                this.getPostsByUserTitle(text);
                break;
            case "distance-2":
                //
                break;
            default: //should we do a default?
                break;
        }
    }

    public setCategory(category: any) {
        if (this.category !== category.category) {
            let cat = category;
            if (this.category) {
                let checkCat = (this.category === "All")
                    ? "postCategory_All"
                    :  Category[this.category];
                document.getElementById(checkCat).style.backgroundColor = "#2e7c31";
            }

            document.getElementById(cat.id).style.backgroundColor = "#445963";
            this.category = cat.category;
            this.getPostsByCategory(cat.category);
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
