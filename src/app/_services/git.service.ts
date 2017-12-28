
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GitService {

  constructor(private http: Http) { }
  
  getAndParseRepos(url: string) {
    return this.http.get(url).map(response => response.json());
  }
}