import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Blueprint } from '../blueprint';
import { WipeService } from '../wipe.service';
import { CraftService } from '../craft.service';
import { AuthenticationService } from '../authentication.service';

import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { StuffService } from '../stuff.service';

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
    private craftService: CraftService,
    private stuffService: StuffService
  ) {}

  selected_wipe: number;
  wipe_bps: Blueprint[] = [];
  dico_players_bps = {};
  list_players: number[] = [];

  control = new FormControl();
  l_stuff: string[];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.getStuff();

    this.route.params.subscribe((params) => {
      this.selected_wipe = this.wipeService.currentWiperie;
      console.log(this.selected_wipe);
      // getting all bps for this selected wipe.
      this.getBlueprints(this.selected_wipe);
      this.getWipePlayers(this.selected_wipe);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.l_stuff.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getBlueprints(wipe_id: number): void {
    this.wipe_bps = [];
    this.wipeService.getBlueprints(wipe_id).subscribe((bps) => {
      this.wipe_bps = bps;
      this.initPlayerBlueprint();
    });
  }

  getStuff(): void {
    this.l_stuff = [];
    this.l_stuff = this.stuffService.getStuff();
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

  addBlueprint(user_id: number, stuff_name: string): void {
    if (!stuff_name) {
      window.alert('Insert an existing blueprint name (ex: Assault Rifle)');
      return;
    } else {
      console.log(stuff_name);
      this.craftService
        .addBlueprint({
          // todo, generate id for mysql.
          wipe_id: this.selected_wipe,
          //user_id: this.authenticationService.currentUserValue.id,
          user_id: user_id,
          stuff_name: stuff_name,
        } as Blueprint)
        .subscribe((bp) => {
          this.getBlueprints(this.selected_wipe);
        });
    }
  }

  removeBlueprint(wipe_id: number, user_id: number, stuff: string): void {
    for (var i = 0; i < this.wipe_bps.length; i++) {
      var bp: Blueprint = this.wipe_bps[i];
      console.log(wipe_id, user_id, stuff);
      if (
        bp.wipe_id == wipe_id &&
        bp.user_id == user_id &&
        bp.stuff_name == stuff
      ) {
        var bp_id: number = bp.id;
        this.craftService.removeBlueprint(bp_id).subscribe((bp) => {
          console.log('Deleted : ', bp);
          this.getBlueprints(this.selected_wipe);
        });
      }
    }
  }
}
