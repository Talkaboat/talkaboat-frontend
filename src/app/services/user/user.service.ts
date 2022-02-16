import { EventEmitter, Injectable } from '@angular/core';
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
  constructor(private readonly userRepositoryService: UserRepositoryService, private readonly web3Service: Web3Service) { }

  isUserLoggedIn(): boolean {
    return this.userData.userName ? true : false;
  }

  logout() {
    localStorage.removeItem('aboat_access');
    this.userData = { userName: '', addresses: [], email: '', rewards: 0, verified: false };
    this.onUserStateChanged.emit(false);
  }

  async autoConnect() {
    if (localStorage.getItem('aboat_access')) {
      await this.web3Service.connect();
      if (this.web3Service.accounts) {
        await this.getUserProfile();
      }
    } else {
      await this.web3Service.reConnect();
    }
  }

  async connect() {
    await this.web3Service.connect(true);
    if (this.web3Service.accounts) {
      if (localStorage.getItem('aboat_access')) {
        await this.getUserProfile();
      } else {
        this.userRepositoryService.requestLogin(this.web3Service.accounts[0]).subscribe({
          next: (v) => this.signAuthorizationRequest(v),
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

  signAuthorizationRequest(authorizationRequest: UserAuthorizationRequestResponse) {
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
    localStorage.setItem('aboat_access', authorization.token);
    this.getUserProfile();
  }

  requestLoginError(error: any) {
    //Show request login error
  }

  signAuthorizationError(error: any) {

  }

  loginError(error: any) {

  }

  profileError(error: any) {

  }
}
