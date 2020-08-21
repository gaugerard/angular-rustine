import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Blueprint } from '../blueprint';
import { WipeService } from '../wipe.service';
import { CraftService } from '../craft.service';
import { AuthUser } from '../auth_user';

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
    private craftService: CraftService
  ) {}

  selected_wipe: number;
  wipe_bps: Blueprint[] = [];
  dico_players_bps = {};
  list_players: number[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );
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
      console.log(this.wipe_bps);
      this.initPlayerBlueprint();
    });
  }

  getWipePlayers(wipe_id: number): void {
    console.log(this.selected_wipe);
    this.list_players = [];
    this.wipeService.getWipePlayers(wipe_id).subscribe((rep) => {
      console.log(rep);
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
    console.log(this.dico_players_bps);
  }

  addBlueprint(): void {
    const wipe_id: number = 2068; //test values
    const bp_id: number = 1000; //test value
    const user_id: number = 42; //test value
    const stuff_name: string = 'Crossbow'; //test value

    this.craftService
      .addBlueprint({
        // todo, generate id for mysql.
        wipe_id: wipe_id,
        id: bp_id,
        user_id: user_id,
        stuff_name: stuff_name,
      } as Blueprint)
      .subscribe((bp) => {
        console.log('bp added');
        this.getBlueprints(this.selected_wipe);
        window.location.reload();
      });
  }

  removeBlueprint(): void {
    const bp_id: number = 1000; //test value
    this.craftService.removeBlueprint(bp_id).subscribe((bp) => {
      console.log('bp removed');
      this.getBlueprints(this.selected_wipe);
      window.location.reload();
    });
  }
}
