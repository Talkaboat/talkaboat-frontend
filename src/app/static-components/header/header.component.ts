import { Component, OnInit } from '@angular/core';
import { UserProfileData } from 'src/app/services/repository/user-repository/models/user-profile-data.model';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: UserProfileData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };

  isProfileSidebarOpen: boolean = false;
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.onUserStateChanged.subscribe(userState => {
      this.userData = this.userService.userData;
    });
  }

  toggleSidebar() {
    this.websiteStateService.toggleSidebar();
  }

}
