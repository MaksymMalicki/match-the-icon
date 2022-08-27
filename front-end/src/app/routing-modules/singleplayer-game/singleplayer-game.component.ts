import { Component, OnInit } from '@angular/core';
import { CardsDeckService } from '../../../shared/services/cards-deck.service';
import { Icon } from '../../shared-interfaces/icon.interface';
import { SingleplayerGameService } from './singleplayer-game.service';

@Component({
  templateUrl: './singleplayer-game.component.html',
  styleUrls: ['./singleplayer-game.component.css']
})
export class SingleplayerGameComponent implements OnInit {
  constructor(
    public gameService: SingleplayerGameService,
    public cardsDeckService: CardsDeckService,
  ) { }

  ngOnInit(): void {
    this.gameService.generateNewGame();
  }

  public checkIfMatchOccurred(icon: Icon): void {
    console.log(this.gameService.gameStarted)
    if(!this.gameService.gameStarted){
      this.gameService.gameStarted$.next(true);
    } else if(this.gameService.gameStarted && this.gameService.gameCards.length > 10){
      this.gameService.gameStarted$.next(false);
    }
    this.gameService.checkIfMatchOccurred(icon);
  }
}
