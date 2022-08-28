import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardsDeckService } from '../../../shared/services/cards-deck.service';
import { Icon } from '../../shared-interfaces/icon.interface';

const minIconSize = 50;
const maxIconSize = 80;

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
    '🔊',
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
  public gameStarted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get gameStarted(): boolean{
    return this.gameStarted$.getValue();
  }

  private static generateIconRotation(): number {
    return Math.floor(Math.random() * 360);
  }

  private static generateIconSize(): number {
    return Math.floor(Math.random() * (maxIconSize - minIconSize) + minIconSize);
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
    console.log(this.gameCards, this.playerCards);
    if (this.playerCards.length > 0) {
      this.gameCards.unshift(this.playerCards.shift());
    }
  }

  public generateNewGame(): void {
    this.playerCards = this.cardsDeckService.shuffleFisherYates(this.getCardsDeck());
    this.gameCards = [];
    console.log(this.gameCards, this.playerCards);
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
