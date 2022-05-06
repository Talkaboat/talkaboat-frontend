import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvestmentRepositoryService } from 'src/app/services/repository/investment-repository/investment-repository.service';
import { Investment } from 'src/app/services/repository/investment-repository/models/investment.model.dto';
import { UserService } from 'src/app/services/user/user.service';
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
  constructor(private readonly websiteStateService: WebsiteStateService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
  private readonly investmentRepository: InvestmentRepositoryService) { }

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
    })
  }

  totalInvest() {
    this.investmentUsd = 0;
    this.investmentToken = 0;
    this.invests.forEach(invest => {
      if (invest.type == this.selectedType) {
        this.investmentUsd += invest.usd;
        this.investmentToken += invest.token;
      }
    });
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }


  async connect() {
    await this.userService.connect();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
