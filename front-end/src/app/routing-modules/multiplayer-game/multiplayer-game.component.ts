import { Component, OnInit } from '@angular/core';
import { OpenRoom } from '../../shared-interfaces/open-room.interface';
import { Web3AuthService } from './web3-auth.service';

@Component({
  templateUrl: './multiplayer-game.component.html',
  styleUrls: ['./multiplayer-game.component.scss']
})
export class MultiplayerGameComponent implements OnInit {

  constructor(
    public web3auth: Web3AuthService,
  ) {
  }

  public openRooms: OpenRoom[] = [
    {
      roomAddress: '0xddddddd',
      ownerAddress: '0xddddddd',
      playersNumber: '3',
    }
  ];

  ngOnInit(): void {
    console.log("hehe")
  }

}
