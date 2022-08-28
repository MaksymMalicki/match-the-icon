import { Component, Input } from '@angular/core';
import { OpenRoom } from '../../shared-interfaces/open-room.interface';

@Component({
  selector: 'app-open-room-tile',
  templateUrl: './open-room-tile.component.html',
  styleUrls: ['./open-room-tile.component.css']
})
export class OpenRoomTileComponent {
  @Input('openRoomData') openRoomData: OpenRoom;
}
