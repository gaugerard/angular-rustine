import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css'],
})
export class WriteMessageComponent implements OnInit {
  messages: Message[];

  constructor(
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService
      .getMessages()
      .subscribe((messages) => (this.messages = messages));
  }

  add(sender: string, receiver: string, content: string): void {
    
    sender = sender.trim();
    receiver = receiver.trim();

    console.log(sender)
    console.log(receiver)
    if (!sender || !receiver) {
      window.alert('Please enter a sender/receiver!');
      return;
    }

    var ids = [];
    for (var i = 0; i < this.messages.length; i++) {
      ids.push(this.messages[i].id);
    }
    
    var id:number;
    // infinte loop if 1000000 id already exists.
    while(!id){
      var generatedId = Math.floor(Math.random() * Math.floor(100000));
      if(!(generatedId in ids)){
        id = generatedId
      }
    }

    this.messageService
      .addMessage({
        // todo, generate id for mysql.
        id: id,
        content: content,
        sender: sender,
        receiver: receiver,
      } as Message)
      .subscribe((message) => {
        this.messages.push(message);
      });
      
  }

  goBack(): void {
    this.location.back();
  }
}
