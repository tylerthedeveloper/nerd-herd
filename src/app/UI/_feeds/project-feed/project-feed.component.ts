import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../../_services/project.service'
import { Project } from '../../../_models/project';

@Component({
  selector: 'project-feed',
  templateUrl: './project-feed.html',
  providers: [ ProjectService ]
})

export class ProjectFeedComponent {

    //postTitle: string;
    projects : Observable<Project[]>;

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
