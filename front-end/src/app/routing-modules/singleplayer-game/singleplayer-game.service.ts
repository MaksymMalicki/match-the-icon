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

  public get gameStarted(): boolean {
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
      card => this.cardsDeckService.shuffleFisherYates(card).map(
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
      this.gameCards.unshift(this.playerCards.shift());
    }
  }

  public generatePlayerAndGameDecks(): void {
    this.playerCards = this.cardsDeckService.shuffleFisherYates(this.getCardsDeck());
    this.gameCards = [];
    this.getNewGameTopdeck();
  }

  public checkIfIconsMatchOccurred(icon: Icon): void {
    this.gameCards[0].filter(
      gameCardIcon => gameCardIcon.hex === icon.hex,
    ).length > 0
      ? this.getNewGameTopdeck()
      : null;
  }

  public startGame(): void{
    this.gameStarted$.next(true);
  }

  public endGame(): void{
    this.gameStarted$.next(false);
  }

  public calculateResult(time: number, playerPunishment: number): number {
    return 10000-time-playerPunishment;
  }
}
