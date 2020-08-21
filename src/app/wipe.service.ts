import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Wipe } from './wipe';
import { AuthUser } from './auth_user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Blueprint } from './blueprint';

@Injectable({
  providedIn: 'root',
})
export class WipeService {
  private wipesUrl = 'http://51.210.12.59:9000/wipe';
  private wipeAuthUrl = 'http://51.210.12.59:9000/auth_user/user';
  private wipeBlueprint = 'http://51.210.12.59:9000/blueprint';

  private authorized_wipe: AuthUser[] = [];
  private wipes: Wipe[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // get all wipes of the logged in user.
  getWipes(user_id: number): Wipe[] {
    this.wipes = [];
    const url = `${this.wipeAuthUrl}/${user_id}`;
    //console.log(url);
    this.http.get<AuthUser[]>(url).subscribe((rep) => {
      this.authorized_wipe = rep;
      //console.log(this.authorized_wipe);
      var i;
      for (i = 0; i < this.authorized_wipe.length; i++) {
        var wipe_id = this.authorized_wipe[i].wipe_id;
        console.log(wipe_id);
        this.getWipe(wipe_id).subscribe((rep) => {
          this.wipes.push(rep);
          //console.log(this.wipes);
        });
      }
      //console.log(this.wipes);
    });
    //console.log(this.wipes);
    //return this.http.get<Wipe[]>(url);
    console.log(this.wipes);
    return this.wipes;
  }

  // get a wipe.
  getWipe(wipe_id: number): Observable<Wipe> {
    const url = `${this.wipesUrl}/${wipe_id}`;
    return this.http
      .get<Wipe>(url)
      .pipe(catchError(this.handleError<Wipe>(`getWipe wipe_id=${wipe_id}`)));
  }

  // get players from a wipe.
  getBlueprints(wipe_id: number): Observable<Blueprint[]> {
    const url = `${this.wipeBlueprint}/${wipe_id}`;
    console.log(url);
    return this.http.get<Blueprint[]>(url);
  }

  // add a new wipe to the logged user.
  addMessage(wipe: Wipe): Observable<Wipe> {
    return this.http.post<Wipe>(this.wipesUrl, wipe, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
