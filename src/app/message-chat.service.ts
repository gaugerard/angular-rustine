import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageChat } from './message_chat';
import { WipeChat } from './wipe_chat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageChatService {
  private messageChatUrl = 'http://51.210.12.59:9000/message_chat';
  private allWipeMessages = 'http://51.210.12.59:9000/wipe_chat';

  constructor(private http: HttpClient) {}

  getAllMessages(wipe_id: number) {
    const url = `${this.allWipeMessages}/${wipe_id}`;
    return this.http
      .get<MessageChat[]>(url)
      .pipe(
        catchError(this.handleError<MessageChat[]>(`getWipe wipe_id=${wipe_id}`))
      );
  }

  getMessage(msg_id: number): Observable<MessageChat> {
    const url = `${this.messageChatUrl}/${msg_id}`;
    return this.http
      .get<MessageChat>(url)
      .pipe(
        catchError(this.handleError<MessageChat>(`getWipe wipe_id=${msg_id}`))
      );
  }

  sendMessage(msg: MessageChat): Observable<MessageChat> {
    return this.http.post<MessageChat>(this.messageChatUrl, msg);
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
