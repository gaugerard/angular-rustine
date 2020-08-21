import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageChat } from './message_chat';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageChatService {
  private messagesChatUrl = 'http://51.210.12.59:9000/message_chat';

  constructor(private http: HttpClient) {}

  getMessage(msg_id: number): Observable<MessageChat> {
    const url = `${this.messagesChatUrl}/${msg_id}`;
    //console.log(url);
    return this.http
      .get<MessageChat>(url)
      .pipe(
        catchError(this.handleError<MessageChat>(`getWipe wipe_id=${msg_id}`))
      );
  }

  sendMessage(msg: MessageChat): Observable<MessageChat> {
    //console.log(msg);
    return this.http.post<MessageChat>(this.messagesChatUrl, msg);
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
