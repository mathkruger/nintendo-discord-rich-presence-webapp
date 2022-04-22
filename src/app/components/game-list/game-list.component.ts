import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  constructor(
    public gameService: GameService,
    private discordService: DiscordService
  ) { }

  @Input()
  list: Game[] = [];

  selectGame(game: Game) {
    window.scrollTo(0,0);
    window.localStorage.setItem('currentGame', JSON.stringify(game));
    this.discordService.updateDiscord(game.title, 'playing').subscribe(() => {
      this.gameService.setCurrentSelectedGame(game);
    });
  }

}
