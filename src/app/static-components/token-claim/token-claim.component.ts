import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.updateTokens();
    this.userService.onRewardsChanged.subscribe(_ => this.updateTokens());

  }

  setToMaxClaimableAmount() {
    this.claimMode = -1;
    this.claimAmount.setValue(this.vestedTokens);
  }

  claimAboat() {
    this.claimMode = 1;
    this.claimAmount.disable();
  }

  claimBnb() {
    this.claimMode = 2;
    this.claimAmount.disable();
  }

  updateTokens() {
    this.totalTokens = this.userService.currentRewards.total;
    this.vestedTokens = this.userService.currentRewards.vested;
  }

  confirmClaim() {
    this.claimAmount.enable();
  }
}
