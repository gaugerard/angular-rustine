import { Component, OnInit } from '@angular/core';
import { WipeChat } from '../wipe_chat';
import { MessageChat } from '../message_chat';
import { WipeService } from '../wipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageChatService } from '../message-chat.service';
import { AuthenticationService } from '../authentication.service';
import { observable, Observable } from 'rxjs';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
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

  /*ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );
      console.log('==> ', this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getWipeChat(this.selected_wipe);
      this.orderList(this.messages);
    });
  }*/

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );

      this.messageChatService
        .getAllMessages(this.selected_wipe)
        .subscribe((rep) => {
          this.messages = [];
          this.messages = rep;
        });
    });
  }

  tohourfct(msg: Date) {
    var d = new Date(msg);
    var h = d.toUTCString();
    //console.log(h);
    return h;
  }

  sendMessage(content: string): void {
    const today = new Date();

    console.log(today);

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
