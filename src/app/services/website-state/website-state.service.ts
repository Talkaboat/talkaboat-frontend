import { HostListener, Injectable, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MediaPlayerState } from 'src/app/static-components/media-player/mediaplayer-state';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  public onSidebarStateChanged = new EventEmitter<boolean>();
  public onMediaPlayerStateChanged: EventEmitter<MediaPlayerState> = new EventEmitter<MediaPlayerState>();
  constructor(private readonly router: Router, private readonly loaderService: LoaderService) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        loaderService.hide();
      }
    });
  }

  public closeSidebarIfSmallerThanLg() {
    if (this.isSidebarOpen && window.innerWidth <= 1024) {
      this.toggleSidebar(true, false);
    }
  }

  public toggleSidebar(forceState = false, state = false) {
    this.isSidebarOpen = forceState ? state : !this.isSidebarOpen;
    this.onSidebarStateChanged.emit(this.isSidebarOpen);
  }
}
