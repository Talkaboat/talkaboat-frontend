import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  public onSidebarStateChanged = new Subject<boolean>();

  constructor() { }

  public toggleSidebar(forceState = false, state = false) {
    this.isSidebarOpen = forceState ? state : !this.isSidebarOpen;
    this.onSidebarStateChanged.next(this.isSidebarOpen);
  }
}
