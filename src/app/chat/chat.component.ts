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
  ) 
  {
    document.addEventListener('keypress', function(e){
      let key = e.keyCode;
      if ( key === 13 ){
        document.getElementById('plane-click').click();
      }
    })
  }

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
  }

  getWipeChat(wipe_id: number): void {
    this.wipe_chats = [];
    this.wipeService.getWipeChat(wipe_id).subscribe((wc) => {
      this.wipe_chats = wc;
      this.initMessages();
    });
  }

  initMessages(): void {
    this.messages = [];
    for (var i = 0; i < this.wipe_chats.length; i++) {
      var key: number = this.wipe_chats[i].msg_id;
      this.messageChatService.getMessage(key).subscribe((msg) => {
        var message: MessageChat = msg;
        this.messages.push(msg);
      });
    }
  }

  sendMessage(content: string): void {
    const today = new Date();

    this.messageChatService
      .sendMessage({
        content: content,
        date: new Date(today),
        user_src: this.authenticationService.currentUserValue.id,
      } as MessageChat)
      .subscribe((message) => {
        this.wipeService
          .addMessageChat({
            msg_id: message.id,
            wipe_id: this.selected_wipe,
          } as WipeChat)
          .subscribe((wipechat) => {
            this.messages.push(message);
          });
      });
      
  }

  erase(): void {
    let input_text = <HTMLInputElement>(document.getElementById('message-to-send'));
    input_text.value = "";
  }


}
