import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Wipe } from './wipe';
import { AuthUser } from './auth_user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Blueprint } from './blueprint';
import { WipeChat } from './wipe_chat';
import { MessageChat } from './message_chat';

@Injectable({
  providedIn: 'root',
})
export class WipeService {
  private wipesUrl = 'http://51.210.12.59:9000/wipe';
  private wipeAuthUrl = 'http://51.210.12.59:9000/auth_user/user';
  private wipeAddAuthUrl = 'http://51.210.12.59:9000/auth_user';
  private wipeBlueprint = 'http://51.210.12.59:9000/blueprint';
  private wipeWipeChat = 'http://51.210.12.59:9000/wipe_chat';

  private authorized_wipe: AuthUser[] = [];
  private wipes: Wipe[] = [];

  public currentWiperie: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // get all wipes of the logged in user.
  getWipes(user_id: number): Wipe[] {
    this.wipes = [];
    const url = `${this.wipeAuthUrl}/${user_id}`;
    this.http.get<AuthUser[]>(url).subscribe((rep) => {
      this.authorized_wipe = rep;
      var i;
      for (i = 0; i < this.authorized_wipe.length; i++) {
        var wipe_id = this.authorized_wipe[i].wipe_id;
        console.log(wipe_id);
        this.getWipe(wipe_id).subscribe((rep) => {
          this.wipes.push(rep);
        });
      }
    });
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

  // get players from a wipe by looking at craft.
  getBlueprints(wipe_id: number): Observable<Blueprint[]> {
    const url = `${this.wipeBlueprint}/${wipe_id}`;
    console.log(url);
    return this.http.get<Blueprint[]>(url);
  }

  // get players from a wipe by looking at auth_user.
  getWipePlayers(wipe_id: number): Observable<AuthUser[]> {
    const url = `${this.wipeAddAuthUrl}/${wipe_id}`;
    console.log(url);
    return this.http.get<AuthUser[]>(url);
  }

  //get wipe_chat for a specific wipe
  getWipeChat(wipe_id: number): Observable<WipeChat[]> {
    const url = `${this.wipeWipeChat}/${wipe_id}`;
    console.log(url);
    return this.http.get<WipeChat[]>(url);
  }

  // add a new wipe.
  addWipe(wipe: Wipe): Observable<Wipe> {
    return this.http.post<Wipe>(this.wipesUrl, wipe, this.httpOptions);
  }

  // add a msg into chat of a wipe (wipe_chat).
  addMessageChat(wipe_chat: WipeChat): Observable<WipeChat> {
    return this.http.post<WipeChat>(
      this.wipeWipeChat,
      wipe_chat,
      this.httpOptions
    );
  }

  // authorize a use on a wipe
  authUser2Wipe(authorization: AuthUser): Observable<AuthUser> {
    console.log(authorization);
    return this.http.post<AuthUser>(
      this.wipeAddAuthUrl,
      authorization,
      this.httpOptions
    );
  }

  // checks if a wipe still has player in it (after delete operation) and if not, it deletes the wipe from the db.
  removeEmptyWipe(wipe_id: number): void {
    const url = `${this.wipeAddAuthUrl}/${wipe_id}`;
    this.http.get(url).subscribe((rep) => {
      if (rep.valueOf.length == 0) {
        console.log('wipe needs to be deleted');
        const delete_wipe_url = `${this.wipesUrl}/${wipe_id}`;
        this.http.delete(delete_wipe_url).subscribe((rep) => {
          console.log(rep);
        });
      }
    });
  }

  removeAuthUser2Wipe(user_id: number, wipe_id: number): Observable<AuthUser> {
    for (var i = 0; i < this.authorized_wipe.length; i++) {
      var auth_id = this.authorized_wipe[i];
      if (user_id == auth_id.user_id && wipe_id == auth_id.wipe_id) {
        console.log('===> user ', user_id);
        console.log('===> wipe ', wipe_id);
        console.log('===> auth_id ', auth_id.id);
        const url = `${this.wipeAddAuthUrl}/${auth_id.id}`;
        return this.http.delete<AuthUser>(url);
      }
    }
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
