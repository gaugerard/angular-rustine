import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Message } from './message';
import { MESSAGES } from './mock-messages';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagessUrl = 'http://51.210.12.59:9000/messages'; // URL to web api
  private messageUrl = 'http://51.210.12.59:9000/message'; // URL to web api
  private postmessageUrl = 'http://51.210.12.59:9000/new/message'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    //return this.http.get<Message[]>(this.messagessUrl);
    console.log(this.http.get<Message[]>(this.messagessUrl));
    return this.http.get<Message[]>(this.messagessUrl);
  }

  /** GET hero by id. Will 404 if id not found */
  getMessage(id: number): Observable<Message> {
    const url = `${this.messageUrl}/${id}`;
    return this.http
      .get<Message>(url)
      .pipe(catchError(this.handleError<Message>(`getMessage id=${id}`)));
  }

  /** POST: add a new hero to the server */
  addMessage(msg: Message): Observable<Message> {
    return this.http
      .post<Message>(this.postmessageUrl, msg, this.httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
