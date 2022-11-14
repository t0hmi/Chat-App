import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel, Message } from 'src/app/store/channel/channel.state';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private server_url = "https://localhost:7257/channels";

  constructor(private auth : AuthService, private http : HttpClient) { }

  getChannels() : Observable<Channel[]> {
    return this.http.get<Channel[]>(this.server_url, {headers : this.getHeader()})
  }

  createChannel(name: string, description: string) {
    return this.http.post<Channel>(this.server_url, {name, description}, {headers : this.getHeader()})
  }

  getMessages(id : number | undefined) {
    return this.http.get<{messages : Message[]}>(`${this.server_url}/${id}`, {headers: this.getHeader()})
  }

  private getHeader() : HttpHeaders {
    const token = this.auth.getToken();

    if(!token) throw 'token not found';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return headers;
  }

}
