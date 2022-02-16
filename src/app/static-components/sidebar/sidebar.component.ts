import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarOpen = true;
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    this.websiteStateService.onSidebarStateChanged.subscribe(state => this.isSidebarOpen = state);
  }

  toggleLang() {
    this.translateService.toggle();
  }

}
