import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  show = false;
  isSignRequest = false;
  private subscriptions: Subscription[] = [];

  constructor(private readonly loaderService: LoaderService, private readonly userService: UserService) { }

  ngOnInit() {
    this.subscriptions.push(this.loaderService.onLoadingStateChanged
      .subscribe((state: boolean) => {
        this.show = state;
      }));
    this.subscriptions.push(this.userService.onSignMessageRequested.subscribe(state => this.isSignRequest = state));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  cancelSignRequest() {
    this.userService.cancelSign();
  }

}
