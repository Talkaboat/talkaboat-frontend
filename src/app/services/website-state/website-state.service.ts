import { Location } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaPlayerState } from 'src/app/static-components/media-player/mediaplayer-state';
import { ModalState } from 'src/app/static-components/modal/models/modal-state.model';
import { LoaderService } from '../loader/loader.service';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  headerState = 'home';
  modalState: ModalState = { title: '', onClose: () => { }, onSubmit: () => { }};
  navigationHistory: string[] = [];
  public onSidebarStateChanged = new EventEmitter<boolean>();
  public onHeaderStateChanged = new EventEmitter<string>();
  public onMediaPlayerStateChanged: EventEmitter<MediaPlayerState> = new EventEmitter<MediaPlayerState>();
  public onLoginModalStateChanged = new EventEmitter<boolean>();
  constructor(private readonly router: Router, private readonly loaderService: LoaderService, private readonly location: Location, private readonly titleService: Title, private readonly route: ActivatedRoute, private readonly userRepository: UserRepositoryService, private readonly toastr: ToastrService) {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['ref']) {
        localStorage.setItem('tab_ref', params['ref']);
        this.router.navigate([]);
      }
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
        let page = this.formatUrl(ev.urlAfterRedirects);
        page = page ? page : 'Home';
        this.evaluateHeaderState(page);
        this.titleService.setTitle('Talkaboat - ' + page);
        this.navigationHistory.push(ev.urlAfterRedirects);
      }
    });
  }

  openModal() {

  }

  evaluateHeaderState(page: string) {
    if (page) {
      if (page == "Home") {
        this.SetHeaderState("home");
        return;
      }
    }
    this.SetHeaderState("default");
  }

  formatUrl(url: any) {
    if (url.includes('?')) {
      url = url.substring(0, url.indexOf('?'));
    }
    url = url.replaceAll('/', '');
    url = this.titleCaseWord(url);
    return url;
  }

  SetHeaderState(state: string) {
    this.headerState = state;
    this.onHeaderStateChanged.emit(this.headerState);
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

  public backOrRootNavigation(changedQueryParams = null) {
    if (this.canNavigateBack()) {
      this.navigationHistory.pop();
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
