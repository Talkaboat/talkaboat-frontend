import { Injectable } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { AuthService } from '../../auth/auth.service';
import { Reward } from '../../repository/user-repository/models/reward.model';
import { UserService } from '../../user/user.service';
import { SignalRService } from '../signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class RewardHubService extends SignalRService {
  protected override hubUrl: string = 'reward';

  constructor(private readonly userService: UserService, protected override readonly auth: AuthService) {
    super(auth);
  }

  getMediaTrackingBody(owner: number, asset: number, playtime: number) {
    return  {owner: owner, asset: asset, playTime: Math.floor(playtime)}
  }

  heartbeat(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }
    return this.hubConnection?.invoke('Heartbeat', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  play(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }
    return this.hubConnection?.invoke('Play', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  pause(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }
    return this.hubConnection?.invoke('Pause', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  stop(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }
    return this.hubConnection?.invoke('Stop', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  mute(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }
    return this.hubConnection?.invoke('Mute', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  unmute(owner: number, asset: number, playtime: number) {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return;
    }

    return this.hubConnection?.invoke('Unmute', this.getMediaTrackingBody(owner, asset, playtime)).then((_) => {

    }).catch(error => {
      console.log(error);
    });
  }

  connect() {
    return this.startConnection().then(() => {
      this.hubConnection?.on('RewardUpdate', (reward: Reward) => {
        this.userService.updateRewards(reward);
      });
    });
  }

  disconnect() {
    return this.stopConnection()?.then(() => {

    });
  }
}
