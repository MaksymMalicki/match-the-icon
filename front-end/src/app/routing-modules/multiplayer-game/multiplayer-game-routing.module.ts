import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiplayerGameComponent } from './multiplayer-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MultiplayerGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiplayerGameRoutingModule {
}
