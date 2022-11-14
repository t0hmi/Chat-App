import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {

  private URL = 'wss:/localhost:7257/chat'

  constructor() {}

   getConnection() : HubConnection {
    return new HubConnectionBuilder().withUrl(this.URL, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).build();
   }
}
