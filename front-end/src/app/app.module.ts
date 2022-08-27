import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './reusable-components/header/header.module';
import { MultiplayerGameComponent } from './routing-modules/multiplayer-game/multiplayer-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiplayerGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
