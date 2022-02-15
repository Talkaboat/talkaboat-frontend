import { Component, OnInit } from '@angular/core';
import { Web3Service } from './services/web3/web3.service';
import { WebsiteStateService } from './services/website-state/website-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSidebarOpen = true;
  constructor(private readonly web3Service: Web3Service, private readonly websiteStateService: WebsiteStateService) {

  }

  async ngOnInit() {
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    this.websiteStateService.onSidebarStateChanged.subscribe(state => this.isSidebarOpen = state);
    this.closeSidebarIfMobile();
    await this.web3Service.reConnect();
  }

  closeSidebarIfMobile() {
    if (window.innerWidth <= 500) {
      this.websiteStateService.toggleSidebar(true, false);
    }
  }

  title = 'talkaboat';


}
