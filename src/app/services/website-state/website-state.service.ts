import { Location } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaPlayerState } from 'src/app/static-components/media-player/mediaplayer-state';
import { LoaderService } from '../loader/loader.service';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  navigationHistory: string[] = [];
  public onSidebarStateChanged = new EventEmitter<boolean>();
  public onMediaPlayerStateChanged: EventEmitter<MediaPlayerState> = new EventEmitter<MediaPlayerState>();
  constructor(private readonly router: Router, private readonly loaderService: LoaderService, private readonly location: Location, private readonly titleService: Title, private readonly route: ActivatedRoute, private readonly userRepository: UserRepositoryService, private readonly toastr: ToastrService) {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['email']) {
        if (params['code']) {
          this.userRepository.confirmMail(params['email'], params['code']).subscribe(() => {
            this.toastr.success('E-Mail verified');
            this.router.navigate([]);
          });
        } else if (params['sub']) {
          this.userRepository.subscribeNewsletter(params['email'], params['sub']).subscribe((val: boolean) => {
            if (val) {
              this.toastr.success('Subscribed to Newsletter');
            } else {
              this.toastr.success('Unsubscribed Newsletter');
            }
            this.router.navigate([]);
          });
        }

      }
    });
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        loaderService.hide();
        let page = this.formatUrl(ev.url);
        page = page ? page : 'Home';
        this.titleService.setTitle('Talkaboat - ' + page);
        this.navigationHistory.push(ev.urlAfterRedirects);
      }
    });
  }

  formatUrl(url: any) {
    if (url.includes('?')) {
      url = url.substring(0, url.indexOf('?'));
    }
    url = url.replaceAll('/', '');
    url = this.titleCaseWord(url);
    return url;
  }

  titleCaseWord(word: string) {
    if (!word) { return word; }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
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
