import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slider } from './animations';
import { AuthService } from './services/auth/auth.service';
import { MediaHelperService } from './services/media-helper/media-helper.service';
import { UserService } from './services/user/user.service';
import { WebsiteStateService } from './services/website-state/website-state.service';
import { ChatHubService } from './services/hubs/chat-hub/chat-hub.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slider ]
})
export class AppComponent implements OnInit {

  isSidebarOpen = true;
  isLoginModalOpen = false;
  constructor(private readonly userService: UserService,
    private readonly websiteStateService: WebsiteStateService,
    private readonly chat: ChatHubService) {

  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  async ngOnInit() {
    // await this.chat.connect();
    // await this.chat.getHistory(3);
    // // await this.chat.joinRoom(3);
    // // await this.chat.sendMessage(3, 4);
    this.isSidebarOpen = this.websiteStateService.isSidebarOpen;
    this.websiteStateService.onSidebarStateChanged.subscribe(state => this.isSidebarOpen = state);
    this.websiteStateService.onLoginModalStateChanged.subscribe(state => this.isLoginModalOpen = state);
    this.websiteStateService.closeSidebarIfSmallerThanDefinedPixel();
    this.userService.autoConnect();
    // this.authService.googleSignIn();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.websiteStateService.closeSidebarIfSmallerThanDefinedPixel();
  }



  title = 'talkaboat';


}
