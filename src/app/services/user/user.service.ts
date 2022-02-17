import { EventEmitter, Injectable } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { AuthorizationResponse } from '../repository/user-repository/models/authorization-response.model';
import { UserAuthorizationRequestResponse } from '../repository/user-repository/models/user-authorization-request.response.model';
import { UserProfileData } from '../repository/user-repository/models/user-profile-data.model';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { Web3Service } from '../web3/web3.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: UserProfileData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };

  onUserStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly web3Service: Web3Service,
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService) { }

  isUserLoggedIn(): boolean {
    return this.userData.userName ? true : false;
  }

  logout() {
    localStorage.removeItem('aboat_access');
    this.userData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
    this.toastrService
    this.onUserStateChanged.emit(false);
  }

  async autoConnect() {
    if (localStorage.getItem('aboat_access')) {
      await this.web3Service.connect();
      if (this.web3Service.accounts) {

        this.loaderService.show();
        await this.getUserProfile();
      }
    } else {
      await this.web3Service.reConnect();
    }
    this.loaderService.hide();
  }

  async register(email: string, username: string) {

    await this.web3Service.connect(true);
    if (this.web3Service.accounts) {
      this.loaderService.show();
      this.userRepositoryService.register(email, username, this.web3Service.accounts[0]).subscribe({
        next: v => this.signAuthorizationError(v),
        error: e => this.registerError(e)
      })
    }
  }

  signAuthorizationRequestAndConfirmWallet(authorizationRequest: UserAuthorizationRequestResponse) {
    this.web3Service.web3.eth.personal.sign(authorizationRequest.key, this.web3Service.accounts[0])
      .then((v: string) => this.login(v))
      .catch((e: any) => this.signAuthorizationError(e));
  }

  confirmWallet(signature: string) {
    this.userRepositoryService.confirm(signature).subscribe({
      next: v => this.successfullyLogin(v),
      error: e => this.confirmationError(e)
    });
  }

  registerError(error: any) {
    this.loaderService.hide();
  }

  confirmationError(error: any) {
    this.loaderService.hide();
  }


  async connect() {
    await this.web3Service.connect(true);
    if (this.web3Service.accounts) {
      this.loaderService.show();
      if (localStorage.getItem('aboat_access')) {
        await this.getUserProfile();
        this.loaderService.hide();
      } else {
        this.userRepositoryService.requestLogin(this.web3Service.accounts[0]).subscribe({
          next: (v) => this.signAuthorizationRequestAndLogin(v),
          error: (e) => this.requestLoginError(e)
        });
      }
    }
  }

  async getUserProfile() {
    this.userRepositoryService.getProfile().subscribe({
      next: (profileData) => {
        this.userData = profileData;
        this.onUserStateChanged.emit(true);
      },
      error: (e) => this.profileError(e)
    })
  }

  signAuthorizationRequestAndLogin(authorizationRequest: UserAuthorizationRequestResponse) {
    this.web3Service.web3.eth.personal.sign(authorizationRequest.key, this.web3Service.accounts[0])
      .then((v: string) => this.login(v))
      .catch((e: any) => this.signAuthorizationError(e));
  }

  login(signature: string) {
    this.userRepositoryService.login(this.web3Service.accounts[0], signature).subscribe({
      next: (v) => this.successfullyLogin(v),
      error: (e) => this.loginError(e)
    });
  }

  successfullyLogin(authorization: AuthorizationResponse) {
    this.loaderService.hide();
    localStorage.setItem('aboat_access', authorization.token);
    this.getUserProfile();
  }

  requestLoginError(error: any) {
    //Show request login error
    this.loaderService.hide();
  }

  signAuthorizationError(error: any) {
    this.loaderService.hide();
  }

  loginError(error: any) {
    this.loaderService.hide();
  }

  profileError(error: any) {
    this.loaderService.hide();
  }
}
