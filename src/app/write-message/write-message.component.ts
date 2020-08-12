import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})

export class WriteMessageComponent implements OnInit {

  messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void{
    this.messageService.getMessages().subscribe(messages => this.messages = messages);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.messageService.addMessage({ content:"salut je suis contenu!", sender:name, receiver:"nath" } as Message)
      .subscribe(message => {
        this.messages.push(message);
      });
  }

}