import { Location } from '@angular/common';
import { Injectable, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaPlayerState } from 'src/app/static-components/media-player/mediaplayer-state';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  navigationHistory: string[] = [];
  public onSidebarStateChanged = new EventEmitter<boolean>();
  public onMediaPlayerStateChanged: EventEmitter<MediaPlayerState> = new EventEmitter<MediaPlayerState>();
  constructor(private readonly router: Router, private readonly loaderService: LoaderService, private readonly location: Location) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        loaderService.hide();
        console.log(ev.urlAfterRedirects);
        this.navigationHistory.push(ev.urlAfterRedirects);
      }
    });
  }

  public closeSidebarIfSmallerThanDefinedPixel() {
    if (this.isSidebarOpen && window.innerWidth <= 1474) {
      this.toggleSidebar(true, false);
    }
  }

  public toggleSidebar(forceState = false, state = false) {
    this.isSidebarOpen = forceState ? state : !this.isSidebarOpen;
    this.onSidebarStateChanged.emit(this.isSidebarOpen);
  }

  public canNavigateBack(): boolean {
    return this.navigationHistory.length > 1;
  }

  public backNavigation(changedQueryParams = null) {
    if (this.canNavigateBack()) {
      this.navigationHistory.pop();
      this.location.back();
    }
  }
}
