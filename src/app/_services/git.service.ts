import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material'; 
import { ConfirmDialogComponent, DialogComponent, ProjCatDialogComponent } from '../UI/components/index';

@Injectable()
export class GitService {
  
  constructor(private httpService: HttpService, public dialog: MdDialog) { }
  
  getAndParseRepos(url: string, userID : string) : Observable<any> {
    //return this.http.get(url).map(response => response.json() );
    //this.httpService.httpGetRequest(url);
    var confirmedRepos = Array<any>();
    return Observable.create((observer : any) => {
      this.httpService.httpGetRequest(url).subscribe(repos =>
      {
        let _repos = Array<any>();
        repos.forEach((repo : any) => {
            let _repo = {
                gitID: repo["id"],
                author: userID,
                title: repo["name"],
                createdAt: repo["created_at"],
                updatedAt: repo["updated_at"],
                text: repo["description"] || "none",
                html_url: repo["html_url"],
                language: repo["language"]
            };
          _repos.push(_repo);
        });
        _repos.forEach(_repo =>  {
          let dialogRef: MdDialogRef<ConfirmDialogComponent>;
          dialogRef = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.title = "Do you want to include this repo?";
          dialogRef.componentInstance.content = _repo.title;
          dialogRef.afterClosed().subscribe((result: string) => {
              if (result) {
                //confirmedRepos.push(_repo);
                let catDialogRef: MdDialogRef<ProjCatDialogComponent>;
                catDialogRef = this.dialog.open(ProjCatDialogComponent);
                catDialogRef.componentInstance.title = "Please pick a project category";
                catDialogRef.componentInstance.content = _repo.title;
                catDialogRef.afterClosed().subscribe((result: string) => {
                    _repo["category"] = result;
                    confirmedRepos.push(_repo);
                    //this.projectService.addGitProject(_repo);
                      //console.log("res " + result);
                    observer.next(_repo);        
                  });
                }
            });
          });
        });
      });
//    return confirmedRepos;
  }

  /*
  gitGetRequest(endpoint : string): any {
    return this.httpService.httpGetRequest(endpoint)
      .subscribe(res => {
        let tempGit = {
          "login" : res["login"],
          "avatar_url" : res["avatar_url"],
          "repos_url" : res["repos_url"],
          "company" : res["company"],
          "blog" : res["blog"],
          "bio" : res["bio"]
        };
  }
  */
}