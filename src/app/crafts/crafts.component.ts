import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Blueprint } from '../blueprint';
import { WipeService } from '../wipe.service';

@Component({
  selector: 'app-crafts',
  templateUrl: './crafts.component.html',
  styleUrls: ['./crafts.component.css'],
})
export class CraftsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wipeService: WipeService
  ) {}

  selected_wipe: number;
  wipe_bps: Blueprint[] = [];
  dico_players_bps = {};
  list_players: number[] =[];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selected_wipe = Number.parseInt(
        this.route.snapshot.paramMap.get('wipe_id')
      );
      console.log(this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getBlueprints(this.selected_wipe);
    });
  }

  getBlueprints(wipe_id: number): void {
    this.wipeService.getBlueprints(wipe_id).subscribe((bps) => {
      this.wipe_bps = bps;
      console.log(this.wipe_bps);
      this.initPlayerBlueprint();
    });
  }

  initPlayerBlueprint(): void {
    for (var i = 0; i < this.wipe_bps.length; i++) {
      var key: number = this.wipe_bps[i].user_id;
      var stuff: string = this.wipe_bps[i].stuff_name;

      if (!(key in this.dico_players_bps)) {
        this.dico_players_bps[key] = [stuff];
        this.list_players.push(key)
      } else {
        this.dico_players_bps[key].push(stuff);
      }
    }
    console.log(this.dico_players_bps);
  }
}
