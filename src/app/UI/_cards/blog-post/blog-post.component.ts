import { Component, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import { HelperService } from '../../../_services/helpers.service';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.html',
})
export class BlogPostComponent {
    @Input() author : string;
    @Input() title : string;
    @Input() content : string;
    @Input() timeSince : number;   
    convertedTimeSince : string;

    ngOnInit(): void {
        this.convertedTimeSince  = HelperService.convertTime(this.timeSince);
      //this.convertedTimeSince  = this.convertTime(this.timeSince);
    }

    /*
    convertTime(timestamp : number ) : string {
      
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var postDate : any = new Date(timestamp);      
        var elapsed  = Date.now() - postDate;
        
        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
        
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
        
        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }
    */
}
