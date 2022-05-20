import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../../user/user.service';
import { Web3Service } from '../../web3/web3.service';
import { RepositoryService } from '../repository.service';
import { Reward } from '../user-repository/models/reward.model';
import { MEDIA_API } from './media-urls.const';

@Injectable({
  providedIn: 'root'
})
export class MediaRepositoryService extends RepositoryService  {

  constructor(protected override readonly http: HttpClient, protected override readonly web3Service: Web3Service, private readonly userService: UserService) {
    super(http, web3Service);
  }

  //Which information do we need?
  public play(owner: number, asset: number, playtime: number):  Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.PLAY_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

  getMediaTrackingBody(owner: number, asset: number, playtime: number) {
    return  {owner: owner, asset: asset, playTime: Math.floor(playtime)}
  }

  public pause(owner: number, asset: number, playtime: number):  Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.PAUSE_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

  public token(): Observable<number> {
    const api = MEDIA_API.URL + MEDIA_API.TOKEN_URL;
    return this.get(api);
  }

  public mute(owner: number, asset: number, playtime: number): Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.MUTE_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

  public unmute(owner: number, asset: number, playtime: number): Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.UNMUTE_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

  public heartbeat(owner: number, asset: number, playtime: number): Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.HEARTBEAT_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

  public stop(owner: number, asset: number, playtime: number):  Observable<Reward> {
    if (!this.userService.isUserLoggedIn() || !owner || !asset) {
      return of({vested: 0, total: 0, unvested: 0});
    }
    const api = MEDIA_API.URL + MEDIA_API.STOP_URL;
    return this.post<Reward>(api, this.getMediaTrackingBody(owner, asset, playtime));
  }

}
