import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleplayerGameComponent } from './singleplayer-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SingleplayerGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleplayerGameRoutingModule {
}
