import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnChanges {

  constructor(
    public gameService: GameService,
    private discordService: DiscordService
  ) { }

  @Input()
  list: any[] = [];

  ngOnChanges() {
    this.list.forEach(item => {
      this.gameService.getGameThumbnail(item.cover).subscribe(cover => {
        item.coverURL = cover.url;
      });
    });
  }

  selectGame(game: any) {
    window.scrollTo(0,0);
    window.localStorage.setItem('currentGame', JSON.stringify(game));
    this.discordService.updateDiscord(game.name).subscribe(() => {
        this.gameService.setCurrentSelectedGame(game);
    });
  }

}
