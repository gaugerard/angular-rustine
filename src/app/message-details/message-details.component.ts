import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css'],
})
export class MessageDetailsComponent implements OnInit {
  msg: Message;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMessage();
    this.sub = this.route.params.subscribe(params => {
      const term = params['term'];
      this.service.get(term).then(result => { console.log(result); });
    });
  }

  getMessage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageService.getMessage(id).subscribe((msg) => (this.msg = msg));
  }

  goBack(): void {
    this.location.back();
  }
}
