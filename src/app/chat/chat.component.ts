import { Component, OnInit } from '@angular/core';
import { WipeChat } from '../wipe_chat';
import { MessageChat } from '../message_chat';
import { WipeService } from '../wipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageChatService } from '../message-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wipeService: WipeService,
    private messageChatService: MessageChatService
  ) {}

  selected_wipe: number;
  wipe_chats: WipeChat[] = [];
  messages: MessageChat[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );
      console.log(this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getWipeChat(this.selected_wipe);
    });
  }

  getWipeChat(wipe_id: number): void {
    this.wipe_chats = [];
    this.wipeService.getWipeChat(wipe_id).subscribe((wc) => {
      this.wipe_chats = wc;
      console.log(this.wipe_chats);
      this.initMessages();
      console.log(this.messages);
    });
  }

  initMessages(): void {
    for (var i = 0; i < this.wipe_chats.length; i++) {
      var key: number = this.wipe_chats[i].msg_id;
      this.messageChatService.getMessage(key).subscribe((msg) => {
        var message: MessageChat = msg;
        this.messages.push(msg);
        console.log('added msg');
      });
    }
  }

  sendMessage(): void {
    this.messageChatService
      .sendMessage({
        id: 2000,
        content: 'je suis un msg test 2000',
        date: new Date(),
        user_src: +localStorage.getItem('currentUser'),
      } as MessageChat)
      .subscribe((message) => {
        this.messages.push(message);
        window.location.reload();
      });
  }
}
