import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRoomTileComponent } from './open-room-tile.component';



@NgModule({
  declarations: [
    OpenRoomTileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OpenRoomTileComponent,
  ]
})
export class OpenRoomTileModule { }
