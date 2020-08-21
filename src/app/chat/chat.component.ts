import { Component, OnInit } from '@angular/core';
import { WipeChat } from '../wipe_chat';
import { MessageChat } from '../message_chat';
import { WipeService } from '../wipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageChatService } from '../message-chat.service';
import { AuthenticationService } from '../authentication.service';
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
    private messageChatService: MessageChatService,
    private authenticationService: AuthenticationService
  ) {}

  selected_wipe: number;
  wipe_chats: WipeChat[] = [];
  messages: MessageChat[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );
      console.log('==> ', this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getWipeChat(this.selected_wipe);
    });
    //console.log('selected_wipe == ', this.selected_wipe);
  }

  getWipeChat(wipe_id: number): void {
    this.wipe_chats = [];
    this.wipeService.getWipeChat(wipe_id).subscribe((wc) => {
      this.wipe_chats = wc;
      //console.log(this.wipe_chats);
      this.initMessages();
      //console.log(this.messages);
    });
  }

  initMessages(): void {
    this.messages = [];
    for (var i = 0; i < this.wipe_chats.length; i++) {
      var key: number = this.wipe_chats[i].msg_id;
      this.messageChatService.getMessage(key).subscribe((msg) => {
        var message: MessageChat = msg;
        this.messages.push(msg);
        //console.log('added msg');
      });
    }
  }

  sendMessage(content: string): void {
    const today = new Date();

    this.messageChatService
      .sendMessage({
        id: 2000,
        content: content,
        date: new Date(today),
        //user_src: +localStorage.getItem('currentUser'), ==> does not work
        user_src: this.authenticationService.currentUserValue.id,
      } as MessageChat)
      .subscribe((message) => {
        this.wipeService
          .addMessageChat({
            id: 7777,
            msg_id: 2000,
            wipe_id: this.selected_wipe,
          } as WipeChat)
          .subscribe((wipechat) => {
            this.messages.push(message);
            window.location.reload();
          });
      });
  }
}
