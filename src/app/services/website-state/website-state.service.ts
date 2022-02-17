import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  public onSidebarStateChanged = new Subject<boolean>();

  constructor(private readonly router: Router, private readonly loaderService: LoaderService) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        loaderService.hide();
      }
    });
  }

  public toggleSidebar(forceState = false, state = false) {
    this.isSidebarOpen = forceState ? state : !this.isSidebarOpen;
    this.onSidebarStateChanged.next(this.isSidebarOpen);
  }
}
