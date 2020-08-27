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
  selected_wipe: number;
  wipePlayers: number;

  constructor(
    private authentication: AuthenticationService,
    private wipeService: WipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //console.log(this.router.url);
    this.selected_wipe = this.wipeService.currentWiperie;
    this.getUser();
    this.getWipes();
    this.getPlayers();
  }

  getWipes(): void {
    this.wipeService
      .getWipes(this.user.id)
      .subscribe((rep) => (this.wipes = rep));
  }

  setCurrentWipe(wipe_id: number): void {
    this.wipeService.currentWiperie = wipe_id;
    // console.log('Current wipe id : ', this.wipeService.currentWiperie);

    if (this.router.url.search('chat') == 1) {
      // console.log('you are in chat');
      this.router.navigate(['chat/', wipe_id]);
    } else {
      // console.log('you are in crafts');
      this.router.navigate(['crafts/', wipe_id]);
    }
  }

  getUser(): void {
    this.authentication.getUser().subscribe((rep) => (this.user = rep));
  }

  getPlayers(): void {
    this.route.params.subscribe((params) => {
      this.wipeService
        .getWipePlayers(this.wipeService.currentWiperie)
        .subscribe((rep) => {
          this.wipePlayers = rep.length;
        });
    });
  }

  addWipe(server_name: string): void {
    server_name = server_name.trim();

    if (!server_name) {
      window.alert('Please enter a server_name!');
      return;
    }

    this.wipeService
      .addWipe({
        server_name: server_name,
      } as Wipe)
      .subscribe((wipe) => {
        this.wipes.push(wipe);
        //  console.log(this.user.id, wipe.id);
        this.authUser2Wipe(this.user.id, wipe.id);
      });
  }

  removeAuth2wipe(user_id: number, wipe_id: number): void {
    this.wipeService.removeAuthUser2Wipe(user_id, wipe_id).subscribe((auth) => {
      console.log('User removed from wipe: ', auth);
      this.getWipes();
      this.wipeService.removeEmptyWipe(wipe_id);
    });
  }

  authUser2Wipe(user_id: number, wipe_id: number): void {
    this.wipeService
      .authUser2Wipe({
        wipe_id: wipe_id,
        user_id: user_id,
      } as AuthUser)
      .subscribe();
  }
}
