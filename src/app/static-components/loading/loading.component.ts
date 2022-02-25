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
  private subscription: Subscription = new Subscription();

  constructor(private readonly loaderService: LoaderService, private readonly userService: UserService) { }

  ngOnInit() {
    this.subscription = this.loaderService.onLoadingStateChanged
      .subscribe((state: boolean) => {
        this.show = state;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancelSignRequest() {
    this.userService.cancelSign();
  }

}
