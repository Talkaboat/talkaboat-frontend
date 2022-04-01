import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositoryService } from '../repository.service';
import { AuthorizationResponse } from './models/authorization-response.model';
import { RewardDetail } from './models/reward-detail.model';
import { Reward } from './models/reward.model';
import { UserAuthorizationRequestResponse } from './models/user-authorization-request.response.model';
import { UserData } from './models/user-data.model';
import { UserProfileData } from './models/user-profile-data.model';
import { USER_API } from './user-urls.const';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService  extends RepositoryService {

    //Which information do we need?
  public register(mailAdress: string, userName: string, address: string): Observable<UserAuthorizationRequestResponse> {
    if (!this.web3Service.accounts) {
      return of();
    }
    const api = USER_API.URL + USER_API.REGISTER_URL;
    const body = { address, mailAdress, userName };
    return this.post<UserAuthorizationRequestResponse>(api, body);
  }

  confirmMail(email: string, code: string): Observable<any> {
    const api = USER_API.URL + USER_API.CONFIRM_EMAIL.replace("{email}", email).replace("{code}", code);
    return this.post(api, null);
  }

  resendMail(email: string): Observable<any> {
    const api = USER_API.URL + USER_API.RESEND_EMAIL.replace("{email}", email);
    return this.post(api, null);
  }

  public isUserKyced(): Observable<boolean> {
    const api = USER_API.URL + USER_API.KYC_URL;
    return this.get<boolean>(api);
  }

  public confirm(signature: string): Observable<AuthorizationResponse> {
    if (!this.web3Service.accounts) {
      return of();
    }
    const api = USER_API.URL + USER_API.CONFIRMATION_URL + this.web3Service.accounts[0];
    return this.post(api, signature);
  }

  public getRewards(): Observable<Reward> {
    const api = USER_API.URL + USER_API.REWARD_URL;
    return this.get(api);
  }

  public getRewardDetails(): Observable<RewardDetail[]> {
    const api = USER_API.URL + USER_API.REWARD_DETAILS_URL;
    return this.get(api);
  }

  public claim(address: string): Observable<any> {
    const api = USER_API.URL + USER_API.CLAIM_URL + address;
    return this.post(api, null);
  }

  requestLogin(wallet: string): Observable<UserAuthorizationRequestResponse> {
    if (!wallet) {
      return of();
    }
    const api = USER_API.URL + USER_API.REQUEST_LOGIN_URL.replace('{wallet}', wallet);
    return this.post<UserAuthorizationRequestResponse>(api);
  }

  login(wallet: string, signature: string): Observable<AuthorizationResponse> {
    if (!wallet) {
      return of();
    }
    const api = USER_API.URL + USER_API.LOGIN_URL;
    const body = { address: wallet, signature };
    return this.post<AuthorizationResponse>(api, body);
  }

  getUser(): Observable<UserData> {
    const api = USER_API.URL + USER_API.PROFILE_URL;
    return this.get<UserData>(api);
  }

  getProfile(username: string): Observable<UserProfileData> {
    const api = USER_API.URL + USER_API.PROFILE_DETAILS_URL.replace("{username}", username);
    return this.get<UserProfileData>(api);
  }

  subscribeNewsletter(email: string, subscribe: number): Observable<any> {
    const shouldSubscribe = subscribe == 1;
    const api = USER_API.URL + (shouldSubscribe ? USER_API.SUBSCRIBE_URL : USER_API.UNSUBSCRIBE_URL).replace("{email}", email);
    return this.post(api);
  }

  isWalletWhitelisted(campaign: string, wallet: string): Observable<boolean> {
    if (!wallet) {
      return of(false);
    }
    const api = USER_API.URL + USER_API.REQUEST_WHITELIST.replace("{campaign}", campaign).replace("{wallet}", wallet);
    return this.get(api);
  }
}
