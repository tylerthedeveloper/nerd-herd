import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../../_services/post.service'
import { Category, Post } from '../../../_models/post';
import { Subject } from 'rxjs/Subject';
import { RadiusSearch } from "../../../constants/distance";

@Component({
    selector: 'post-feed',
    templateUrl: './post-feed.html',
    providers: [ PostService ],
    styleUrls: ['./post-feed.css']
})

export class PostFeedComponent {

    public posts : Observable<Post[]>;
    private subject = new Subject<any>();
    public postButtonsArray : any = [];
    public postRadiusSearch : any = [];
    public category : string = "";
    public selectedPostSearchValue: string;
    public selectedPostSearchRadius: number;

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
    /*
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
    */


    public postSearchOptions = [
        {value: 'author-0', viewValue: 'Author'},
        {value: 'title-1', viewValue: 'Title'},
        {value: 'distance-2', viewValue: 'Distance'}
    ];

    

    constructor(public postService: PostService) {
        this.selectedPostSearchValue = this.postSearchOptions[0].value;
    } 

    ngOnInit(): void {
        this.posts = this.postService.getAllPosts();

        this.postButtonsArray = Object.keys(Category).map(cat => {
            return { category: cat, id: Category[cat] };
        });

        this.postRadiusSearch = Object.keys(RadiusSearch).map(rad => {
            return { value: rad, viewValue: RadiusSearch[rad].text, radius: RadiusSearch[rad].radius };
        });

        //this.category = "All";
        //document.getElementById(this.category.id).style.backgroundColor = "#445963";

    }

    post(title: string, content: string) {
        this.postService.addPost(title, content, "Category.Idea");
    }

    public handlePostSearch(searchType: string, text: string, radiusLookUp: string) { 
            //console.log(value)
            //console.log(searchType)
            //console.log(radiusLookUp)
            //console.log(RadiusSearch[radiusLookUp].radius)
            //console.log(RadiusSearch[radiusLookUp].text)
        
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
            default:
                //
                break;

        }
            
    }

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

    private clearPost() : void {
    }
    
    public setCategory(category: any) {
        //var cat = (this.category) ? (this.category) : category;
        //cat = (this.postButtonsArrayIdConstant + cat).replace(/\s/g,'') ;
        if (this.category !== category.category) {
            let cat = category;

            if (this.category) {
                document.getElementById(Category[this.category]).style.backgroundColor = "#2e7c31";
            }
            
            document.getElementById(cat.id).style.backgroundColor = "#445963";
            this.category = cat.category;
            this.getPostsByCategory(cat.category);
        }
    }
}
