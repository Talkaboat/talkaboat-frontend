import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResponseModel } from 'src/app/services/repository/user-repository/models/response.model';
import { UserRepositoryService } from 'src/app/services/repository/user-repository/user-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  wallets: string[] = [];
  walletAddress = new FormControl('', [Validators.required]);

  constructor(private readonly websiteStateService: WebsiteStateService, private readonly translateService: TranslateService, private readonly web3Service: Web3Service ,private readonly authService: AuthService, private readonly userRepository: UserRepositoryService, private readonly userService: UserService, private readonly loadingService: LoaderService, private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    if(!this.userService.isUserLoggedIn()) {
      this.websiteStateService.backOrRootNavigation();
      return;
    }
    this.wallets = this.userService.userData.addresses;
    this.userService.onUserStateChanged.subscribe(state => {
      this.wallets = [];
      if(state) {
        this.wallets = this.userService.userData.addresses;
      } else {
        this.websiteStateService.backOrRootNavigation();
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

  disconnectSocialAccount() {
    this.userRepository.disconnectFirebase().subscribe({
      next: (response) => {
        this.toastrService.success(this.translateService.transform("disconnect_social_success"));
      }, error: response => {
        this.toastrService.error(this.translateService.transform(response?.error?.message));
        this.loadingService.hide();
      }, complete: async () => {

        await this.authService.logout();
        this.loadingService.hide();
      }
    });
  }

  async addWallet() {
    await this.web3Service.connect(true, false);
    this.loadingService.show();
    this.userRepository.addWallet().subscribe({
      next: async (response: ResponseModel) => {
        var signature = await this.web3Service.web3.eth.personal.sign(response.text, this.web3Service.accounts[0]);
        if(!signature) {
          this.toastrService.warning("cancelled");
          this.loadingService.hide();
          return;
        }
        this.confirmWallet(signature, response.text!);
      }, error: (response) => {
        this.toastrService.error(this.translateService.transform(response.error.message));
        this.loadingService.hide();
      }
    });
  }

  confirmWallet(signature: string, guid: string) {
    this.loadingService.show();
    this.userRepository.confirmWalletAdd(signature, guid).subscribe({
      next: (response: any) => {
        this.toastrService.success(this.translateService.transform('add_wallet_success'));
        this.userService.userData.addresses.push(this.web3Service.accounts[0]);
      },
      error: (response: any) => {
        this.toastrService.error(this.translateService.transform(response.error.message));
        this.loadingService.hide();
      }, complete: () => this.loadingService.hide()
    });
  }

  removeWallet(wallet: string) {
    this.loadingService.show();
    this.userRepository.removeWallet(wallet).subscribe({
      next: async (response) => {
        this.toastrService.success(this.translateService.transform('remove_wallet_success'));
        await this.userService.getUserData();
      },
      error: (response) => {
        this.loadingService.hide();
        this.toastrService.error(this.translateService.transform(response?.error?.message));

      }, complete: () => this.loadingService.hide()
    });
  }

}
