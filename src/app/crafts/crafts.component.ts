import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blueprint } from '../blueprint';
import { WipeService } from '../wipe.service';
import { CraftService } from '../craft.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-crafts',
  templateUrl: './crafts.component.html',
  styleUrls: ['./crafts.component.css'],
})
export class CraftsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wipeService: WipeService,
    private authenticationService: AuthenticationService,
    private craftService: CraftService
  ) {}

  selected_wipe: number;
  wipe_bps: Blueprint[] = [];
  dico_players_bps = {};
  list_players: number[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = this.wipeService.currentWiperie;
      console.log(this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getBlueprints(this.selected_wipe);
      this.getWipePlayers(this.selected_wipe);
    });
  }

  getBlueprints(wipe_id: number): void {
    this.wipe_bps = [];
    this.wipeService.getBlueprints(wipe_id).subscribe((bps) => {
      this.wipe_bps = bps;
      this.initPlayerBlueprint();
    });
  }

  getWipePlayers(wipe_id: number): void {
    this.list_players = [];
    this.wipeService.getWipePlayers(wipe_id).subscribe((rep) => {
      for (var i = 0; i < rep.length; i++) {
        this.list_players.push(rep[i].user_id);
      }
    });
  }

  initPlayerBlueprint(): void {
    //this.list_players = [];
    this.dico_players_bps = {};
    for (var i = 0; i < this.wipe_bps.length; i++) {
      var key: number = this.wipe_bps[i].user_id;
      var stuff: string = this.wipe_bps[i].stuff_name;

      if (!(key in this.dico_players_bps)) {
        this.dico_players_bps[key] = [stuff];
        //this.list_players.push(key);
      } else {
        this.dico_players_bps[key].push(stuff);
      }
    }
  }

  addBlueprint(): void {
    const stuff_name: string = 'Assault Rifle'; //test value

    this.craftService
      .addBlueprint({
        // todo, generate id for mysql.
        wipe_id: this.selected_wipe,
        user_id: this.authenticationService.currentUserValue.id,
        stuff_name: stuff_name,
      } as Blueprint)
      .subscribe((bp) => {
        this.getBlueprints(this.selected_wipe);
      });
  }

  removeBlueprint(bp_id: number): void {
    this.craftService.removeBlueprint(bp_id).subscribe((bp) => {
      this.getBlueprints(this.selected_wipe);
    });
  }
}
