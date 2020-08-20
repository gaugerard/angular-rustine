import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Wipe } from '../wipe';
import { AuthenticationService } from '../authentication.service';
import { WipeService } from '../wipe.service';

@Component({
  selector: 'app-wipes',
  templateUrl: './wipes.component.html',
  styleUrls: ['./wipes.component.css'],
})
export class WipesComponent implements OnInit {
  user: User;
  wipes: Wipe[] = [];

  constructor(
    private authentication: AuthenticationService,
    private wipeService: WipeService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getWipes();
  }

  getWipes(): void {
    this.wipes = this.wipeService.getWipes(this.user.id);
  }

  getUser(): void {
    this.authentication.getUser().subscribe((rep) => (this.user = rep));
    console.log(this.user.pseudo);
  }
}
