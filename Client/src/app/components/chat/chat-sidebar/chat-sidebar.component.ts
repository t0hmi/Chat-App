import { Component, ElementRef, Host, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelActions } from 'src/app/store/channel';
import { ChannelSelector } from 'src/app/store/channel/channel.selector';
import { Channel } from 'src/app/store/channel/channel.state';
import { User } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {

  @Input() email? = ''; 
  @Input() channels? : {key:string | undefined, name : string | undefined}[] | null= [];
  @Input() users : string[] = [];
  @Input() hubConnection? : HubConnection;
  @Input() activeChannel? : Channel | null;

  @ViewChild('menu')
  menu! : ElementRef;

  @ViewChild('expandButton')
  expandButton! : ElementRef;

  isMenuOpen = false;
  isSidebarMobileOpen = false;
  isModalOpen = false;
  activeChannel$ = this.store.select(ChannelSelector.selectActiveChannel);
  isListOpen = false;

  constructor(private authService : AuthService, private store : Store) { }

  get firstLetter () : string | undefined {
    return this.email?.charAt(0).toUpperCase();
  }

  ngOnInit(): void {
  }

  openMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openList() : void {
    this.isListOpen = true;
  }

  @HostListener('document:click', ['$event'])
  toggleMenu(event : any ) : void {
    if((event.originalTarget !== this.expandButton.nativeElement) && (event.originalTarget !== this.menu.nativeElement)) {
        this.isMenuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() : void {
    this.isSidebarMobileOpen = !this.isSidebarMobileOpen;
    if(this.isListOpen && !this.isSidebarMobileOpen) {
      this.isListOpen = false;
    }
  }

  openModal() : void {
    this.isModalOpen = true;
  }

  closeModal() : void {
    this.isModalOpen = false;
  }

  setActiveChannel(channel : string | undefined) : void {
    this.isListOpen = false;
    this.hubConnection?.invoke("LeaveRoom", this.activeChannel?.name, this.email).catch(e => console.log(e));
    this.store.dispatch(ChannelActions.setActiveChannel({channelName : channel as string}))
  }
}
