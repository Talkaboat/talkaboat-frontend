import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { RewardDetail } from 'src/app/services/repository/user-repository/models/reward-detail.model';
import { UserProfileData } from 'src/app/services/repository/user-repository/models/user-profile-data.model';
import { UserService } from 'src/app/services/user/user.service';
import { PROFILE_POST_MOCK } from 'src/constants/mocks/profile-post.mock.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userName = "";
  subscriptions: Subscription[] = [];
  rewardDetails: RewardDetail[] = [];
  userProfileData: UserProfileData = { id: 0 };
  userProfileEditData: UserProfileData = { id: 0 };
  mockPost = PROFILE_POST_MOCK;
  editMode = false;
  isProfileToggleOpen = false;
  posts: any[] = [
    this.mockPost,
    this.mockPost,
    this.mockPost
  ];

  constructor(private readonly toastr: ToastrService,
    private readonly toastrService: ToastrService,
    private readonly translationService: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
  ) {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.onReceiveProfileData.subscribe((userProfileData: UserProfileData) => {
      this.userProfileData = userProfileData;
    }));
    this.subscriptions.push(this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.userName = queryParams['user'];
      if (this.userService.getUserProfile(this.userName)) {
        if (this.isMe()) {
          this.rewardDetails = this.userService.rewardDetails;
          this.userService.getUserRewardDetails();
        }
      } else {
        //Fehlerseite ausgeben?
      }

    }));
    this.subscriptions.push(this.userService.onRewardDetailsChanged.subscribe((details: RewardDetail[]) => {
      this.rewardDetails = details;
    }))
    this.subscriptions.push(this.userService.onUserStateChanged.subscribe(() => {
      if (this.isMe()) {
        this.userService.getUserRewardDetails();

      }
    }))
  }

  async connect() {
    await this.userService.connect();
  }

  copyReferal() {
    navigator.clipboard.writeText("https://talkaboat.online/?ref=" + this.userService.userData.userName);
    this.toastrService.info(this.translationService.transform('copy_referral_info'));
  }

  isMe(): boolean {
    return this.userService.isMe(this.userName);
  }

  isEditMode(): boolean {
    return this.isMe() && this.editMode;
  }

  toggleMenu() {
    this.isProfileToggleOpen = !this.isProfileToggleOpen;
  }

  changeProfileImage() {

  }

  changeBackgroundImage() {

  }

  toggleEditMode() {
    if (this.editMode) {
      this.editMode = false;
      return;
    }
    this.userProfileEditData.company = this.userProfileData.company;
    this.userProfileEditData.fullname = this.userProfileData.fullname;
    this.userProfileEditData.description = this.userProfileData.description;
    this.userProfileEditData.role = this.userProfileData.role;
    this.editMode = true;
  }

  updateProfile() {
    this.userService.updateUserProfile(this.userProfileEditData);
    this.editMode = false;
  }

}
