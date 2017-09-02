import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-feed-card',
  templateUrl: './user-feed-card.html',
})
export class UserFeedCardComponent {
    @Input() name : string;
    @Input() email : string;
    @Input() photoUrl : string;
}
