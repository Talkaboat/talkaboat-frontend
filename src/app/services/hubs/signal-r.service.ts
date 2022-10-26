import { Injectable, EventEmitter, isDevMode } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  protected readonly baseUrl: string = 'https://localhost:5001/hubs/';
  protected readonly hubUrl: string = '';
  protected static readonly hubs_prod = "https://api.talkaboat.online/hubs/";
  protected static readonly hubs_dev = "https://localhost:5001/hubs/";
  protected readonly use_dev_hubs = false;
  constructor(protected readonly auth: AuthService) {
    if (!isDevMode() || !this.use_dev_hubs) {
      this.baseUrl = SignalRService.hubs_prod;
    }
  }

  options: IHttpConnectionOptions = {
    accessTokenFactory: () => {
      return localStorage.getItem('aboat_access') ?? '';
    },
  };

  protected hubConnection?: signalR.HubConnection;
  protected startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + this.hubUrl, this.options)
      .build();

    return this.hubConnection
      .start()
      .then(() => {
        console.log(`Connection to ${this.hubUrl} established`);
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  protected stopConnection() {
    return this.hubConnection?.stop().then(() => {
      console.log(`Connection to ${this.hubUrl} stopped`);
    });
  }
}
