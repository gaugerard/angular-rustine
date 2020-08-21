import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Blueprint } from './blueprint';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  private wipeBlueprint = 'http://51.210.12.59:9000/blueprint';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // add a new bp to a user.
  addBlueprint(bp: Blueprint): Observable<Blueprint> {
    return this.http.post<Blueprint>(this.wipeBlueprint, bp, this.httpOptions);
  }

  removeBlueprint(bp_id: number): Observable<Blueprint> {
    const url = `${this.wipeBlueprint}/${bp_id}`;
    return this.http.delete<Blueprint>(url);
  }
}
