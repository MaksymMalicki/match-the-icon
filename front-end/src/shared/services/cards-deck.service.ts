import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardsDeckService {

  constructor() {
  }

  public generateDeck(n: number): number[][] {
    const cards = [];
    let card = [];
    for (let i = 1; i <= n + 1; i++) {
      card.push(i);
    }
    cards.push(card);
    for (let j = 1; j <= n; j++) {
      card = [];
      card.push(1);

      for (let k = 1; k <= n; k++) {
        card.push(n * j + (k + 1));
      }
      cards.push(card);
    }
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        card = [];
        card.push(i + 1);

        for (let k = 1; k <= n; k++) {
          card.push(n + 2 + n * (k - 1) + (((i - 1) * (k - 1) + j - 1) % n));
        }
        cards.push(card);
      }
    }
    return cards;
  }


  public shuffleFisherYates(array: any[]): any[] {
    let i = array.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [array[randIndex], array[i]] = [array[i], array[randIndex]];
    }
    return array;
  }
}
