import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  templateUrl: './marketplace-sell.component.html',
  styleUrls: ['./marketplace-sell.component.scss']
})
export class MarketplaceSellComponent implements OnInit {

  constructor(private readonly userService: UserService) { }
  isSignIn = false;
  isKyced = false;
  subscriptions: any[] = [];
  ngOnInit(): void {
    this.isSignIn = this.userService.isUserLoggedIn();
    this.isKyced = this.userService.isKyced;
    this.subscriptions.push(this.userService.onUserStateChanged.subscribe(state => {
      this.isSignIn = state;
      this.isKyced = this.userService.isKyced;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
