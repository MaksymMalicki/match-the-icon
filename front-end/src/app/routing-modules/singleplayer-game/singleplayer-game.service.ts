import { Injectable } from '@angular/core';
import { CardsDeckService } from '../../../shared/services/cards-deck.service';
import { Icon } from '../../shared-interfaces/icon.interface';

@Injectable({
  providedIn: 'root',
})
export class SingleplayerGameService {

  constructor(
    private cardsDeckService: CardsDeckService,
  ) {
  }


  private icons = [
    '⌚',
    '⌛',
    '☔',
    '☕',
    '☝',
    '⚡',
    '⚽',
    '⛅',
    '⛲',
    '⛳',
    '⛽',
    '✅',
    '✨',
    '⭐',
    '🌀',
    '🌈',
    '🌉',
    '🌏',
    '🌙',
    '🌠',
    '🌭',
    '🌴',
    '🌹',
    '🍆',
    '🍟',
    '🍻',
    '🎀',
    '🎃',
    '🎄',
    '🎅',
    '🎉',
    '🎓',
    '🎣',
    '🎥',
    '🎨',
    '🎭',
    '🎬',
    '🎳',
    '🎷',
    '🎸',
    '🏄',
    '🏋',
    '🏓',
    '🏩',
    '🏹',
    '🐄',
    '🐍',
    '🐘',
    '🐢',
    '🐫',
    '👅',
    '👋',
    '👓',
    '👹',
    '👽',
    '👾',
    '💜',
    '💩',
  ];
  public playerCards: Icon[][];
  public gameCards: Icon[][] = [];

  private static shuffleFisherYates(array: any[]): any[] {
    let i = array.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [array[randIndex], array[i]] = [array[i], array[randIndex]];
    }
    return array;
  }

  private static generateIconRotation(): number {
    return Math.floor(Math.random() * 360);
  }

  private static generateIconSize(): number {
    return Math.floor(Math.random() * 130);
  }

  public getCardsDeck(): Icon[][] {
    const incidenceMatrix: number[][] = this.cardsDeckService.generateDeck(7);
    return incidenceMatrix.map(
      card => card.map(
        iconId => ({
          hex: this.icons[iconId],
          rotation: SingleplayerGameService.generateIconRotation(),
          size: SingleplayerGameService.generateIconSize(),
        }),
      ),
    );
  }

  private getNewGameTopdeck(): void {
    if (this.playerCards.length > 0) {
      console.log(this.gameCards);
      this.gameCards.unshift(this.playerCards.shift());
    }
  }

  public generateNewGame(): void {
    this.playerCards = SingleplayerGameService.shuffleFisherYates(this.getCardsDeck());
    this.gameCards = [];
    this.getNewGameTopdeck();
  }

  public checkIfMatchOccurred(icon: Icon): void {
    this.gameCards[0].filter(
      gameCardIcon => gameCardIcon.hex === icon.hex,
    ).length > 0
      ? this.getNewGameTopdeck()
      : null;
  }

}
