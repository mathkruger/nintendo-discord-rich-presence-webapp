import { Component, OnInit } from '@angular/core';
import { DiscordService } from './services/discord.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private discordService: DiscordService) {

  }

  ngOnInit(): void {
    const currentGame = window.localStorage.getItem('currentGame');

    if (currentGame) {
      const gameObject = JSON.parse(currentGame);
      this.discordService.updateDiscord(gameObject.title, 'playing').subscribe(() => {
        this.gameService.setCurrentSelectedGame(gameObject);
      });
    }
  }

  title = 'nintendo-discord-rich-presence-webapp';
}
