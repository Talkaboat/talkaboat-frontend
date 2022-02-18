import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription = new Subscription();

  constructor(private readonly loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.onLoadingStateChanged
      .subscribe((state: boolean) => {
        this.show = state;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
