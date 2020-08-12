import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Message } from './message';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const messages = [
      {
        id: 1,
        content: 'Go rustine ?',
        sender: 'Gauthier',
        receiver: 'Nathan',
      },
      {
        id: 2,
        content: '... ce soir.',
        sender: 'Nathan',
        receiver: 'Gauthier',
      },
      {
        id: 3,
        content: 'Go rustine ?',
        sender: 'Gauthier',
        receiver: 'Nathan',
      },
      {
        id: 4,
        content: 'je suis sur csgo!',
        sender: 'Gauthier',
        receiver: 'Nathan',
      },
      {
        id: 5,
        content: 'Go rustinette ?',
        sender: 'Nathan',
        receiver: 'Gauthier',
      },
    ];
    return { messages };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(messages: Message[]): number {
    return messages.length > 0
      ? Math.max(...messages.map((message) => message.id)) + 1
      : 11;
  }
}
