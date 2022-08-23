import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  wallets: string[] = [];
  walletAddress = new FormControl('', [Validators.required]);

  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.wallets = this.userService.userData.addresses;
    this.userService.onUserStateChanged.subscribe(state => {
      this.wallets = [];
      if(state) {
        this.wallets = this.userService.userData.addresses;
      }
    });
  }

  connectWithGoogle() {
    localStorage.setItem("connectSocial", "1");
    this.authService.googleSignIn();
  }

  connectWithFacebook() {
    localStorage.setItem("connectSocial", "1");
    this.authService.facebookSignIn();
  }

  addWallet() {

  }

  removeWallet(wallet: string) {

  }

}
