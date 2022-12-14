import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '../../reusable-components/card/card.module';
import { TimerModule } from '../../reusable-components/timer/timer.module';
import { SingleplayerGameRoutingModule } from './singleplayer-game-routing.module';
import { SingleplayerGameComponent } from './singleplayer-game.component';



@NgModule({
  declarations: [
    SingleplayerGameComponent,
  ],
  imports: [
    CommonModule,
    SingleplayerGameRoutingModule,
    CardModule,
    TimerModule,
  ],
})
export class SingleplayerGameModule { }
