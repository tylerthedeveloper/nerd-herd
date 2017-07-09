import { Component } from '@angular/core';

@Component({
  selector: 'feed-tab',
  templateUrl: './feed-tab.html'
})

export class FeedTabComponent {

  tabRoutes: Tab [] = [
      { label:'Posts', link:'/posts', routerLinkActive: true},
      { label:'People', link:'/people', routerLinkActive: true},
      { label:'Projects', link:'/projects', routerLinkActive: false},
    ]
}

export class Tab {
      link: string;
      routerLinkActive: boolean;
      label: string;
}
