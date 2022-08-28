import { Component, OnInit } from '@angular/core';
import { Icon } from '../../shared-interfaces/icon.interface';
import { SingleplayerGameService } from './singleplayer-game.service';

@Component({
  templateUrl: './singleplayer-game.component.html',
  styleUrls: ['./singleplayer-game.component.scss']
})
export class SingleplayerGameComponent implements OnInit {

  public playerPunishment: number = 0;
  public time: number = 0;
  public finalResult: number = 0;
  constructor(
    public gameService: SingleplayerGameService,
  ) { }

  ngOnInit(): void {
    this.gameService.generatePlayerAndGameDecks();
  }

  public handleGameStart(): void{
    this.gameService.startGame();
    this.finalResult = 0;
  }

  public checkIfIconsMatchOccurred(icon: Icon): void {
    if(this.gameService.gameCards.length>10){
      this.gameService.endGame()
    }
    if(this.gameService.gameStarted){
      this.gameService.checkIfIconsMatchOccurred(icon);
    }
  }

  public handleGameEnd(finalTime: number): void {
    this.finalResult = this.gameService.calculateResult(finalTime, this.playerPunishment);
  }
}
