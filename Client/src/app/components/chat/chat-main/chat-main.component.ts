import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { combineLatest, first, Observable, withLatestFrom } from 'rxjs';
import { ChatHubService } from 'src/app/services/chat-hub/chat-hub.service';
import { ChannelActions } from 'src/app/store/channel';
import { ChannelSelector } from 'src/app/store/channel/channel.selector';
import { UserActions } from 'src/app/store/user';
import { UserSelector } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss']
})
export class ChatMainComponent implements OnInit {

  @ViewChild('messages')
  messages!: ElementRef  

  @ViewChild('message')
  messageEl!: ElementRef

  constructor(private store : Store, private hub : ChatHubService) { }

  user$ = this.store.select(UserSelector.selectLoggedUser);
  isLogged$ = this.store.select(UserSelector.selectIsLoggedIn);
  channels$ = this.store.select(ChannelSelector.selectMappedChannel);
  activeChannel$ = this.store.select(ChannelSelector.selectActiveChannel);
  messages$ = this.store.select(ChannelSelector.selectChannelMessages);

  chatHub : HubConnection = this.hub.getConnection();
  users : string[] = []; 

  newMessages: any = [];

  async ngOnInit() {
    this.store.select(UserSelector.selectIsLoggedIn).pipe(first()).subscribe((isLogged) => {
      if(!isLogged) {
        this.store.dispatch(UserActions.tokenData());
      }
      this.store.dispatch(ChannelActions.loadChannels());
    });
    
    await this.chatHub.start()
    
    this.chatHub.on('ReceiveMessage', (m) => {
      this.newMessages = [...this.newMessages, m]
      console.log(m)
    } )
    this.chatHub.on('NewUser', (users) => this.users = users);
    this.chatHub.on('RemoveUser', (users) => this.users = users);
    
    combineLatest([
      this.store.select(UserSelector.selectLoggedUser),
      this.store.select(ChannelSelector.selectActiveChannelName)
    ]).subscribe(([user, channel]) => {
        if(channel && user?.email) {
          this.chatHub.invoke("JoinRoom", channel, user?.email).catch(e => console.log(e));
        }
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      this.store.select(UserSelector.selectLoggedUser).subscribe((user) => {
        if(user?.email) {
          this.chatHub.invoke("Reload", user?.email).catch(e => console.log(e));
        }
    })
  }

  sendMessage(group:string | undefined, email : string | undefined, message : string | undefined,channelId : number = 1) {
    console.log(group)
    if(message) {
      this.chatHub.invoke("SendMessage", group,email, message, channelId).catch(e => console.log(e));
      this.messageEl.nativeElement.value = ''
    }
  }
}
