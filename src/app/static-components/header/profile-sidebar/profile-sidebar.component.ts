import { Component, Input, OnInit } from '@angular/core';
import { UserProfileData } from 'src/app/services/repository/user-repository/models/user-profile-data.model';
import { UserRepositoryService } from 'src/app/services/repository/user-repository/user-repository.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {




  @Input() isProfileSidebarOpen: boolean = false;
  @Input() userData: UserProfileData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
  isSendingMail: boolean = false;
  isUserKyced = true;
  constructor(private readonly userService: UserService, private readonly userRepositoryService: UserRepositoryService) { }

  ngOnInit(): void {
    this.userRepositoryService.isUserKyced().subscribe(isKyced => this.isUserKyced = isKyced);
  }

  getKYC() {
    return this.userData.userName ? 'https://verify-with.blockpass.org/?clientId=aboat_entertainment_ps_kyc&serviceName=Aboat+Entertainment+Private+Sale+KYC&env=prod&refId=' + this.userData.userName : undefined;
  }

  resendMail() {
    if (this.isSendingMail) {
      return;
    }
    this.isSendingMail = true;
    this.userRepositoryService.resendMail(this.userData.email).subscribe(result => {
      this.isSendingMail = false;
    });
  }

}