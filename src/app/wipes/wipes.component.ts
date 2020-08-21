import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Wipe } from '../wipe';
import { AuthUser } from '../auth_user';
import { AuthenticationService } from '../authentication.service';
import { WipeService } from '../wipe.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private wipeService: WipeService,
    private route: ActivatedRoute,
    private router: Router
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

  addWipe(server_name: string): void {
    server_name = server_name.trim();
    const password = '564654';

    if (!server_name || !password) {
      window.alert('Please enter a server_name!');
      return;
    }

    this.wipeService
      .addWipe({
        id: 6666,
        password: password,
        server_name: server_name,
      } as Wipe)
      .subscribe((wipe) => {
        this.wipes.push(wipe);
        this.authUser2Wipe(this.user.id, 6666);
        //window.location.reload();
      });

    console.log(server_name);
  }

  authUser2Wipe(user_id: number, wipe_id: number): void {

    console.log("====> ", localStorage.getItem('currentUser'))
    this.wipeService
      .authUser2Wipe({
        id: 333,
        wipe_id: wipe_id,
        user_id: user_id,
      } as AuthUser)
      .subscribe();
  }
}
