import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { UserData } from 'src/app/services/repository/user-repository/models/user-data.model';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: UserData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
  headerState: string = 'home';
  isProfileSidebarOpen: boolean = false;
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly userService: UserService, private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    this.websiteStateService.onHeaderStateChanged.subscribe(state => {
      this.headerState = state;
    });
    this.userService.onUserStateChanged.subscribe(userState => {
      this.userData = this.userService.userData;
      if (!this.userData.userName) {
        this.isProfileSidebarOpen = false;
      }
    });
  }

  toggleSidebar() {
    this.websiteStateService.toggleSidebar();
  }

  toggleLang() {
    this.translateService.toggle();
  }

}
