import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationResponse } from 'src/app/services/repository/user-repository/models/authorization-response.model';
import { UserAuthorizationRequestResponse } from 'src/app/services/repository/user-repository/models/user-authorization-request.response.model';
import { UserService as UserService } from 'src/app/services/user/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subscription: Subscription[] = [];

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.navigateToHome();
    } else {
      this.subscription.push(this.userService.onUserStateChanged.subscribe(state => {
        if (state) {
          this.navigateToHome();
        }
      }));
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  async connect() {
    await this.userService.connect();
  }
}
