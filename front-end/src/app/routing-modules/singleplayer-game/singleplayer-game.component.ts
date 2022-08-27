import { Component, OnInit } from '@angular/core';
import { Icon } from '../../shared-interfaces/icon.interface';
import { SingleplayerGameService } from './singleplayer-game.service';

@Component({
  templateUrl: './singleplayer-game.component.html',
  styleUrls: ['./singleplayer-game.component.css']
})
export class SingleplayerGameComponent implements OnInit {

  constructor(
    public gameService: SingleplayerGameService,
  ) { }

  ngOnInit(): void {
    this.gameService.generateNewGame();
  }

  public checkIfMatchOccurred(icon: Icon): void {
    console.log(icon);
    this.gameService.checkIfMatchOccurred(icon);
  }
}
