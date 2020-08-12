import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void{
    this.messageService.getMessages().subscribe(messages => this.messages = messages);
  }
}
