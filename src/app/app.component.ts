import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './animations';
import { UserService } from './services/user/user.service';
import { Web3Service } from './services/web3/web3.service';
import { WebsiteStateService } from './services/website-state/website-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slider ]
})
export class AppComponent implements OnInit {

  isSidebarOpen = true;
  constructor(private readonly userService: UserService, private readonly websiteStateService: WebsiteStateService) {

  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  async ngOnInit() {
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    this.websiteStateService.onSidebarStateChanged.subscribe(state => this.isSidebarOpen = state);
    this.websiteStateService.closeSidebarIfSmallerThanLg();
    await this.userService.autoConnect();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.websiteStateService.closeSidebarIfSmallerThanLg();
  }



  title = 'talkaboat';


}
