import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { UserData } from 'src/app/services/repository/user-repository/models/user-data.model';
import { UserRepositoryService } from 'src/app/services/repository/user-repository/user-repository.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {




  @Input() isProfileSidebarOpen: boolean = false;
  @Input() userData: UserData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
  @Output() onSidebarClosed: EventEmitter<boolean> = new EventEmitter<boolean>()
  isSendingMail: boolean = false;
  isUserKyced = true;
  constructor(private readonly userService: UserService, private readonly userRepositoryService: UserRepositoryService, private readonly toastrService: ToastrService, private readonly translationService: TranslateService, private readonly authService: AuthService) { }

  ngOnInit(): void {
    if (this.userData.userName) {
      this.userRepositoryService.isUserKyced().subscribe(isKyced => this.isUserKyced = isKyced);
    }
  }

  getKYC() {
    return this.userData.userName ? 'https://verify-with.blockpass.org/?clientId=aboat_entertainment_ps_kyc&serviceName=Aboat+Entertainment+Private+Sale+KYC&env=prod&refId=' + this.userData.userName : undefined;
  }

  copyReferal() {
    navigator.clipboard.writeText("https://talkaboat.online/?ref=" + this.userService.userData.userName);
    this.toastrService.info(this.translationService.transform('copy_referral_info'));
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

  logout() {
    this.authService.logout();
    this.userService.logout();
  }

  closeProfileSidebar() {
    this.onSidebarClosed.emit(true);
  }

}
