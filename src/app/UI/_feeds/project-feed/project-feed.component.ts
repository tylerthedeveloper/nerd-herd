import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../../_services/project.service'
import { Project } from '../../../_models/project';

@Component({
  selector: 'project-feed',
  templateUrl: './project-feed.html',
  providers: [ ProjectService ],
  styleUrls: ['./project-feed.css']
})

export class ProjectFeedComponent {

    //postTitle: string;
    projects : Observable<Project[]>;

    projectTypes = [
        {value: 'question-0', viewValue: 'Web Dev'},
        {value: 'interview-1', viewValue: 'Mobile'},
        {value: 'social-2', viewValue: 'Open Source'},
        {value: 'conference-3', viewValue: 'Research'}
    ];

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projects = this.projectService.projects;
    }

    addProject(title: string, content: string) {
        this.projectService.addProject(title, content);
    }

    private clearProject() : void {
    }
}
