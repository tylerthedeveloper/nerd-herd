import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../../_services/project.service'
import { ProjectCategory, Project } from '../../../_models/project';
import { Subject } from 'rxjs/Subject';
import { RadiusSearch } from "../../../constants/distance";
import { SearchOptions } from "../../../constants/search-options";
import { BehaviorSubject  } from "rxjs/Rx";


@Component({
    selector: 'project-feed',
    templateUrl: './project-feed.html',
    providers: [ ProjectService ],
    styleUrls: ['./project-feed.css']
})

export class ProjectFeedComponent {

    public projects : BehaviorSubject<Project[]>;
    //public projects : BehaviorSubject<Array<Project>>;
    private subject = new Subject<any>();

    //lists
    public projectTypes : {value: string, viewValue: string }[] = [];
    public projectButtonsArray : any = [];
    public projectRadiusSearch : any = [];

    //active values
    public category : string = "";
    public selected : string = "projectCategory_All";
    public selectedProjectSearchValue: string;
    public selectedProjectSearchRadius: number;
    public projectSearchOptions : any = [];

    projectFormControl = new FormControl('', [
        Validators.required]);

    constructor(public projectService: ProjectService) {

        this.projectTypes = Object.keys(ProjectCategory).map(cat => {
            return { value: ProjectCategory[cat], viewValue: cat };
        });

        this.projectButtonsArray = Object.keys(ProjectCategory).map(cat => {
            let iconType = "";
            if (cat == "School") {
                iconType="lightbulb-o";
            } else if (cat == "Personal") {
                iconType="users";
            } else if (cat == "Social") {
                iconType="comments";
            } else if (cat == "Business") {
                iconType="question-circle";
            } else if (cat == "Idea") {
                iconType="black-tie";
            } else {
                iconType="globe";
            }
            return { category: cat, id: ProjectCategory[cat], iconType: iconType };
        });
        this.projectButtonsArray.unshift({category: "All", id: "projectCategory_All", iconType: "connectdevelop" });

        this.projects = new BehaviorSubject([]);
        this.projectService.getAllProjects().subscribe(project => this.projects.next(project))

        this.projectRadiusSearch = Object.keys(RadiusSearch).map(rad => {
            return { value: rad, viewValue: RadiusSearch[rad].text, radius: RadiusSearch[rad].radius };
        });

        this.projectSearchOptions = Object.keys(SearchOptions).map(opt => {
            return { value: SearchOptions[opt], viewValue: opt };
        });

        this.selectedProjectSearchValue = this.projectSearchOptions[0].value;

    }

    ngOnInit(): void {}

    project(title: string, content: string, category: string) {
        this.projectService.addProject(title, content, category);
    }

//
/// retrieval
//
    getProjectsByUser(userID: string): void {
        //this.projects = this.projectService.getProjectsByUserID(userID);
        this.projectService.getProjectsByUserID(name).subscribe(project => this.projects.next(project));
    }

    getProjectsByUserName(name: string): void {
        //this.projects = this.projectService.getProjectsByUserName(name);
        this.projectService.getProjectsByUserName(name).subscribe(project => this.projects.next(project));
    }

    getProjectsByCategory(category: string): void {
        if (category !== "All") this.projectService.getProjectsByCategory(category).subscribe(project => this.projects.next(project))
        else this.projectService.getAllProjects().subscribe(project => this.projects.next(project));
    }

    getProjectsByUserTitle(title: string): void {
        // this.projects = this.projectService.getProjectsByUserTitle(title);
        this.projectService.getProjectsByUserTitle(title).subscribe(project => this.projects.next(project));        
    }

    getProjectsByDistance(radius: number): void {
        this.projects.next([]);
        this.projectService.getAllProjectsByLocation(radius).subscribe(
            res => this.projects.next(this.projects.getValue().concat(new Array(res))),
            err => console.log("Error retrieving location")
        );
    }

//
/// helpers
//
    private clearProject() : void {}

    private handleProjectSearch(searchType: string, text: string) { //, radiusLookUp: string) { 
        searchType = Object.keys(SearchOptions).find(c => SearchOptions[c] === searchType)
        console.log(searchType) 
        console.log(text) 
        
        switch(searchType) {
            case "Author":
                this.getProjectsByUserName(text);
                break;
            case "Title":
                this.getProjectsByUserTitle(text);
                break;
            case "Distance":
                this.getProjectsByDistance(RadiusSearch[this.selectedProjectSearchRadius].radius);                
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
            this.getProjectsByCategory(category.category);
        }
    }


}


// import { Component, OnInit } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import { ProjectService } from '../../../_services/project.service'
// import { Project } from '../../../_models/project';

// @Component({
//   selector: 'project-feed',
//   templateUrl: './project-feed.html',
//   providers: [ ProjectService ],
//   styleUrls: ['./project-feed.css']
// })

// export class ProjectFeedComponent {

//     //projectTitle: string;
//     projects : Observable<Project[]>;
//     category = "";

//     projectTypes = [
//         {value: 'question-0', viewValue: 'Web Dev'},
//         {value: 'interview-1', viewValue: 'Mobile'},
//         {value: 'social-2', viewValue: 'Open Source'},
//         {value: 'conference-3', viewValue: 'Research'}
//     ];

//     constructor(private projectService: ProjectService) { }

//     ngOnInit(): void {
//         this.projects = this.projectService.projects;
//     }

//     addProject(title: string, content: string) {
//         this.projectService.addProject(title, content);
//     }

//     private clearProject() : void {
//     }

//     setCategory(category: string) {
//         if (this.category) {
//             document.getElementById(this.category).style.backgroundColor="#2e7c31";
//             this.category = category;
//             document.getElementById(category).style.backgroundColor="#445963"
//         } else {
//             this.category = category;
//             document.getElementById(category).style.backgroundColor="#445963"
//         }
//     }
// }
