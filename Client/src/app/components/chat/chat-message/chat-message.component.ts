import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() date? : Date = new Date();
  @Input() username? : string = '';
  @Input() message? : string = ''; 
  firstLetter : string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.firstLetter = this.username?.charAt(0).toUpperCase();
  }

}
