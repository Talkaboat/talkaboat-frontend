import { Component, OnInit } from '@angular/core';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarOpen = true;
  isClickOutsideActive = false;
  constructor(private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    if (this.isSidebarOpen) {
      this.activateClickOutsideDirective();
    }
    this.websiteStateService.onSidebarStateChanged.subscribe(state => {
      this.isSidebarOpen = state
      if (state) {
        this.activateClickOutsideDirective();
      }
    });
  }

  activateClickOutsideDirective() {
    setTimeout(() => {
      this.isClickOutsideActive = true;
    }, 500);
  }

  closeSidebar() {
    this.isClickOutsideActive = false;
    this.websiteStateService.toggleSidebar(true, false);
  }

}
