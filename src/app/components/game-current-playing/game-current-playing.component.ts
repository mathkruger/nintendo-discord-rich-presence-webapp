import { Component, Input, OnInit } from '@angular/core';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-current-playing',
  templateUrl: './game-current-playing.component.html',
  styleUrls: ['./game-current-playing.component.css']
})
export class GameCurrentPlayingComponent implements OnInit {

  constructor(private gameService: GameService, private discordService: DiscordService) { }

  currentGame: any;
  state: 'playing' | 'paused' | null = null;

  ngOnInit() {
    this.gameService.getCurrentSelectedGame().subscribe(item => {
      this.state = item ? 'playing' : null;
      this.currentGame = item;
    });
  }

  pause() {
    this.discordService.removePresence().subscribe(() => {
      this.state = 'paused';
    });
  }

  play() {
    this.discordService.updateDiscord(this.currentGame.name).subscribe(() => {
      this.state = 'playing';
    });
  }

  stop() {
    this.discordService.removePresence().subscribe(() => {
      this.state = null;
      this.gameService.setCurrentSelectedGame(null);
    });
  }

}
