import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCurrentPlayingComponent } from './components/game-current-playing/game-current-playing.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { HeaderComponent } from './components/header/header.component';

import { GameSelectorComponent } from './pages/game-selector/game-selector.component';
import { MyLibraryComponent } from './pages/my-library/my-library.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSearchComponent,
    GameListComponent,
    GameCurrentPlayingComponent,
    ThemeSelectorComponent,
    HeaderComponent,
    GameSelectorComponent,
    MyLibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
