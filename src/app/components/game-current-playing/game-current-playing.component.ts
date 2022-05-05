import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-game-current-playing',
  templateUrl: './game-current-playing.component.html',
  styleUrls: ['./game-current-playing.component.css']
})
export class GameCurrentPlayingComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private discordService: DiscordService,
    private libraryService: LibraryService
  ) { }

  @Input() showButtons = true;
  currentGame: Game | null = null;
  state: 'playing' | 'lobby' | 'paused' | null = null;

  ngOnInit() {
    this.gameService.getCurrentSelectedGame().subscribe(item => {
      this.state = item ? 'playing' : null;
      this.currentGame = item;
    });
  }

  pause() {
    this.discordService.updateDiscord(this.currentGame?.title || "", 'paused', null, 'https://www.nintendo.com' + this.currentGame?.url).subscribe(() => {
      this.state = 'paused';
    });
  }

  play() {
    this.discordService.updateDiscord(this.currentGame?.title || "", 'playing', 'https://www.nintendo.com' + this.currentGame?.url).subscribe(() => {
      this.state = 'playing';
    });
  }

  stop() {
    this.discordService.updateDiscord('💤💤💤', 'no-game').subscribe(() => {
      this.state = null;
      this.gameService.setCurrentSelectedGame(null);
    });
  }

  enterLobby() {
    this.discordService.updateDiscord(this.currentGame?.title || "", 'lobby', 'https://www.nintendo.com' + this.currentGame?.url).subscribe(() => {
      this.state = 'lobby';
    });
  }

}
