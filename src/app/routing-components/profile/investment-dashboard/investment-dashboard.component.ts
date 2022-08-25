import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoundingMode } from 'big.js';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { InvestmentRepositoryService } from 'src/app/services/repository/investment-repository/investment-repository.service';
import { Investment } from 'src/app/services/repository/investment-repository/models/investment.model.dto';
import { UserService } from 'src/app/services/user/user.service';
import { VestingService } from 'src/app/services/web3/vesting/vesting.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  templateUrl: './investment-dashboard.component.html',
  styleUrls: ['./investment-dashboard.component.scss']
})
export class InvestmentDashboardComponent implements OnInit {

  canNavigateBack: boolean = false;
  subscriptions: Subscription[] = [];
  invests: Investment[] = [];
  connected: boolean = false;
  investmentUsd = 0;
  investmentToken = 0;
  selectedType = "seed";
  claimedAmount = 0;
  totalAmount = 0;
  claimablePercentage = 0;
  claimedPercentage = 0;
  constructor(private readonly websiteStateService: WebsiteStateService,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService,
    private readonly translateService: TranslateService,
  private readonly investmentRepository: InvestmentRepositoryService, private readonly vestingService: VestingService) { }

  ngOnInit(): void {
    this.connected = this.userService.userData.userName ? true : false;
    if (this.connected) {
      this.requestInvests();
    }

    this.subscriptions.push(this.userService.onUserStateChanged.subscribe(state => {
      this.connected = state;
      if (this.connected) {
        this.requestInvests();
      } else {
        this.invests = [];
      }
    }));
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
  }

  requestInvests() {
    this.investmentRepository.getInvests().subscribe(invests => {
      this.invests = invests;
      this.totalInvest();
    });
  }

  async requestInvestFromSmartContract() {
    var claimedAmount = await this.vestingService.claimedAmount(this.selectedType);
    var claimedPercentage = await this.vestingService.claimedPercentage(this.selectedType);
    var availablePercentage = await this.vestingService.getCurrentPercentage(this.selectedType);
    var totalAmount = await this.vestingService.totalAmount(this.selectedType);
    console.log(totalAmount);
    this.claimedAmount = claimedAmount.div(10 ** 18).toNumber();
    this.claimedPercentage = claimedPercentage.toNumber() / 10;
    this.claimablePercentage = availablePercentage.toNumber() / 10 - this.claimedPercentage;
    this.totalAmount = totalAmount.div(10 ** 18).toNumber();
  }

  async totalInvest() {
    this.investmentUsd = 0;
    this.investmentToken = 0;
    this.invests.forEach(invest => {
      if (invest.type == this.selectedType) {
        this.investmentUsd += invest.usd;
        this.investmentToken += invest.token;
      }
    });
    await this.requestInvestFromSmartContract();
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

  claim() {
    this.vestingService.claim(this.selectedType).then(
      (success) => {
        this.requestInvestFromSmartContract();
      }, (reason) => {
        if(reason.message.includes('Claim is not open yet')) {
          this.toastrService.info(this.translateService.transform('claim_not_open'));
        }
      }
    )
  }


  async connect() {
    await this.userService.connect();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
