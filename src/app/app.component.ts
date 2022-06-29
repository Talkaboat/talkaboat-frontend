import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slider } from './animations';
import { AuthService } from './services/auth/auth.service';
import { MediaHelperService } from './services/media-helper/media-helper.service';
import { UserService } from './services/user/user.service';
import { WebsiteStateService } from './services/website-state/website-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slider ]
})
export class AppComponent implements OnInit {

  isSidebarOpen = true;
  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly toastr: ToastrService, private readonly websiteStateService: WebsiteStateService, private readonly mediaHelperService: MediaHelperService) {

  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  async ngOnInit() {
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    this.websiteStateService.onSidebarStateChanged.subscribe(state => this.isSidebarOpen = state);
    this.websiteStateService.closeSidebarIfSmallerThanDefinedPixel();
    //this.userService.autoConnect();
    this.authService.googleSignIn();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.websiteStateService.closeSidebarIfSmallerThanDefinedPixel();
  }



  title = 'talkaboat';


}
