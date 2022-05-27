import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCurrentPlayingComponent } from './components/game-current-playing/game-current-playing.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { HeaderComponent } from './components/header/header.component';

import { GameSelectorComponent } from './pages/game-selector/game-selector.component';
import { MyLibraryComponent } from './pages/my-library/my-library.component';
import { FormsModule } from '@angular/forms';
import { RealtimePresenceComponent } from './pages/realtime-presence/realtime-presence.component';
import { NintendoLoginComponent } from './pages/nintendo-login/nintendo-login.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSearchComponent,
    GameListComponent,
    GameCurrentPlayingComponent,
    ThemeSelectorComponent,
    HeaderComponent,
    GameSelectorComponent,
    MyLibraryComponent,
    RealtimePresenceComponent,
    NintendoLoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
