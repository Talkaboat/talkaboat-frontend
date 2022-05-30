import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-token-claim',
  templateUrl: './token-claim.component.html',
  styleUrls: ['./token-claim.component.scss']
})
export class TokenClaimComponent implements OnInit {

  @ViewChild("tokenClaimCheckbox") tokenClaimCheckbox: ElementRef | null = null;
  vestedTokens = 0;
  totalTokens = 0;
  claimMode = -1;
  claimAmount = new FormControl('', [Validators.required, Validators.maxLength(24)]);
  constructor(private readonly userService: UserService, private readonly toastrService: ToastrService, private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    this.updateTokens();
    this.userService.onRewardsChanged.subscribe(_ => this.updateTokens());

  }

  setToMaxClaimableAmount() {
    this.claimMode = -1;
    this.claimAmount.enable();
    this.claimAmount.setValue(this.vestedTokens);
  }

  claimAboat() {
    this.claimMode = 1;
    this.claimAmount.disable();
  }

  claimBnb() {
    this.toastrService.warning(this.translateService.transform("feature_not_available"));
    return;
    this.claimMode = 2;
    this.claimAmount.disable();
  }

  updateTokens() {
    this.totalTokens = this.userService.currentRewards.total;
    this.vestedTokens = this.userService.currentRewards.vested;
  }

  async confirmClaim() {
    await this.userService.claimAboat(this.claimAmount.value);
    this.claimAmount.enable();
    this.claimMode = -1;

  }
}