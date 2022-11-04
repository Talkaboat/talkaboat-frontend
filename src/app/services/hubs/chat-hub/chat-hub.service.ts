import { Injectable } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { SignalRService } from '../signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService extends SignalRService {
  protected override hubUrl: string = 'chat';

  constructor(private readonly userService: UserService, protected override readonly auth: AuthService) {
    super(auth);
  }

  checkConnection() {
    if(this.hubConnection?.state != HubConnectionState.Connected) {
      if(this.hubConnection?.state != HubConnectionState.Connecting && this.hubConnection?.state != HubConnectionState.Reconnecting) {
        this.connect();
      }
      return false;
    }
    return true;
  }

  joinRoom(room: number) {
    if(!this.checkConnection()) {
      return;
    }
    return this.hubConnection?.invoke('JoinRoom', { roomId: 3 }).then((room) => {
      console.log(room);
    }).catch(error => {
      console.log(error);
    });
  }

  getHistory(room: number) {
    if(!this.checkConnection()) {
      return;
    }
    return this.hubConnection?.invoke('GetHistory', { roomId: 3 }).then((room) => {
      console.log(room);
    }).catch(error => {
      console.log(error);
    });
  }


  sendMessage(room: number, answerId: number | undefined = undefined) {
    if(!this.checkConnection()) {
      return;
    }
    return this.hubConnection?.invoke('SendMessage', { chatRoomId: 3, content: "testes", answerId }).then((message) => {
      console.log(message);
    }).catch(error => {
      console.log(error);
    });
  }

  connect() {
    return this.startConnection().then(() => {
      this.hubConnection?.on('ReceiveMessage', (message: any) => {
        console.log(message);
      });
    });
  }

  disconnect() {
    return this.stopConnection()?.then(() => {

    });
  }
}
