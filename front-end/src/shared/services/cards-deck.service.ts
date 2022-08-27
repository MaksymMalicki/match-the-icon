import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardsDeckService {

  constructor() {
  }

  public generateDeck(n: number): number[][] {
    let card = [];
    const cards = [];

    for (let i = 0; i < n + 1; i++) {
      card.push(i);
    }
    cards.push(card);
    for (let j = 0; j < n; j++) {
      card = [];
      for (let k = 0; k < n; k++) {
        card.push(n + 1 + n * j + k);
      }
      cards.push(card);
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        card = []
        card.push(i+1)
        for (let k = 0; k < n; k++) {
          card.push(n+1+n*k+(i*k+j)%n);
        }
        cards.push(card);
      }
    }
    return cards;
  }
}
