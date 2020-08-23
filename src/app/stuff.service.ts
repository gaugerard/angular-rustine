import { Injectable } from '@angular/core';

import { Stuff } from './stuff';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StuffService {
  private stuffUrl = 'http://51.210.12.59:9000/stuff';

  private l_stuff: string[] = [];

  constructor(private http: HttpClient) {}

  getStuff(): string[] {
    this.l_stuff = [];
    const url = `${this.stuffUrl}`;
    this.http.get<Stuff[]>(url).subscribe((rep) => {
      for (var i = 0; i < rep.length; i++) {
        this.l_stuff.push(rep[i].name);
      }
    });
    return this.l_stuff;
  }
}
