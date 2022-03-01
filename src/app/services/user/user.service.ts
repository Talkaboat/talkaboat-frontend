import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../loader/loader.service';
import { AuthorizationResponse } from '../repository/user-repository/models/authorization-response.model';
import { UserAuthorizationRequestResponse } from '../repository/user-repository/models/user-authorization-request.response.model';
import { UserProfileData } from '../repository/user-repository/models/user-profile-data.model';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';
import { Web3Service } from '../web3/web3.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: UserProfileData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
  onUserStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  onSignMessageRequested: EventEmitter<boolean> = new EventEmitter<boolean>();
  signRequestId = 0;
  cancelRequestId = -1;
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
    this.web3Service.disconnect();
    this.onUserStateChanged.emit(false);
  }

  async autoConnect() {
    this.web3Service.defaultLogin();
    if (localStorage.getItem('aboat_access')) {
      await this.web3Service.connect();
      if (this.web3Service.accounts) {

        this.loaderService.show();
        await this.getUserProfile();
      }
    }
    this.loaderService.hide();
  }

  async register(email: string, username: string) {

    await this.web3Service.connect(true);
    if (this.web3Service.accounts) {
      this.loaderService.show();
      this.userRepositoryService.register(email, username, this.web3Service.accounts[0]).subscribe({
        next: v => {
          this.signAuthorizationRequestAndConfirmWallet(v);
        },
        error: e => this.registerError(e)
      })
    }
  }

  signAuthorizationRequestAndConfirmWallet(authorizationRequest: UserAuthorizationRequestResponse) {
    const requestId = this.signRequestId++;
    this.onSignMessageRequested.emit(true);
    this.web3Service.web3.eth.personal.sign(authorizationRequest.key, this.web3Service.accounts[0])
      .then((v: string) => {
        if (this.cancelRequestId < requestId) {
          this.confirmWallet(v);
        }
      })
      .catch((e: any) => this.signAuthorizationError(e))
      .finally(() => this.onSignMessageRequested.emit(false));
  }

  confirmWallet(signature: string) {
    this.userRepositoryService.confirm(signature).subscribe({
      next: v => this.successfullyLogin(v),
      error: e => this.confirmationError(e)
    });
  }

  registerError(error: HttpErrorResponse) {
    this.toastrService.error("registerError: " + error.error);
    this.loaderService.hide();
  }

  confirmationError(error: HttpErrorResponse) {
    this.toastrService.error("confirmationError: " + error.error);
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
    const requestId = this.signRequestId++;
    this.onSignMessageRequested.emit(true);
    this.web3Service.web3.eth.personal.sign(authorizationRequest.key, this.web3Service.accounts[0])
      .then((v: string) => {
        if (this.cancelRequestId < requestId) {
          this.login(v)
        }
      })
      .catch((e: any) => this.signAuthorizationError(e))
      .finally(() => this.onSignMessageRequested.emit(false));
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

  requestLoginError(error: HttpErrorResponse) {
    //Show request login error
    this.toastrService.error("requestLoginError: " + error.error);
    this.loaderService.hide();
  }

  signAuthorizationError(error: HttpErrorResponse) {
    console.log(error);
    this.toastrService.error("signError: " + error.error);
    this.loaderService.hide();
  }

  loginError(error: HttpErrorResponse) {
    console.log(error);
    this.toastrService.error("loginError: " + error.error);
    this.loaderService.hide();
  }

  profileError(error: HttpErrorResponse) {

    this.toastrService.error("profileError: " + error.error);
    this.loaderService.hide();
    localStorage.removeItem('aboat_access');
  }

  cancelSign() {
    this.web3Service.disconnect();
    localStorage.removeItem('aboat_access');
    this.cancelRequestId = this.signRequestId - 1;
    this.loaderService.hide();
  }
}
