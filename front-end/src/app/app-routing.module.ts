import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'singleplayer', pathMatch: 'full'},
  {path: 'singleplayer', loadChildren: ()=>import('./routing-modules/singleplayer-game/singleplayer-game.module').then(m=>m.SingleplayerGameModule)},
  {path: 'multiplayer', loadChildren: ()=>import('./routing-modules/multiplayer-game/multiplayer-game.module').then(m=>m.MultiplayerGameModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{}
