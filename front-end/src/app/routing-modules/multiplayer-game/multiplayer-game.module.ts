import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRoomTileModule } from '../../reusable-components/open-room-tile/open-room-tile.module';
import { MultiplayerGameRoutingModule } from './multiplayer-game-routing.module';
import { MultiplayerGameComponent } from './multiplayer-game.component';



@NgModule({
  declarations: [
    MultiplayerGameComponent,
  ],
  imports: [
    CommonModule,
    OpenRoomTileModule,
    MultiplayerGameRoutingModule,
  ]
})
export class MultiplayerGameModule { }
