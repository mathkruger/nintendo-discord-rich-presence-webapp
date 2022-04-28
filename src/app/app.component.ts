import { Component, OnInit } from '@angular/core';
import { Game } from './models/game';
import { DiscordService } from './services/discord.service';
import { GameService } from './services/game.service';
import { LibraryService } from './services/library.service';
import { NintendoService } from './services/nintendo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private discordService: DiscordService,
    private libraryService: LibraryService,
    private nintendoService: NintendoService
  ) {

  }

  ngOnInit(): void {
    const currentGame = window.localStorage.getItem('currentGame');

    if (currentGame) {
      const gameObject: Game = JSON.parse(currentGame);
      this.discordService.updateDiscord(gameObject.title, 'playing').subscribe(() => {
        this.libraryService.increaseTimePlayed(gameObject);
        this.gameService.setCurrentSelectedGame(gameObject);
      });
    }

    if (!this.nintendoService.isTokenValid()) {
      this.nintendoService.removeToken();
      this.nintendoService.removeUsername();
    }
  }

  title = 'nintendo-discord-rich-presence-webapp';
}
