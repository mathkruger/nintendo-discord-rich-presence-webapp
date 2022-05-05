import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Library } from 'src/app/models/library';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private discordService: DiscordService,
    private libraryService: LibraryService
  ) { }

  @Input()
  list: Game[] = [];
  library: Library | null = null;

  ngOnInit(): void {
    this.loadLibrary();
  }

  selectGame(game: Game) {
    window.scrollTo(0,0);
    window.localStorage.setItem('currentGame', JSON.stringify(game));
    this.discordService.updateDiscord(game.title, 'playing', 'https://www.nintendo.com' + game.url).subscribe(() => {
      this.gameService.setCurrentSelectedGame(game);
    });
  }

  loadLibrary() {
    this.library = this.libraryService.get();
  }

  isGameInLibrary(game: Game) {
    return this.library?.items.find(x => x.game.nsuid === game.nsuid) != null;
  }

  addGameToLibrary(game: Game) {
    this.libraryService.add(game);
    this.loadLibrary();
  }

  removeGameFromLibrary(game: Game) {
    this.libraryService.remove(game);
    this.loadLibrary();
  }

}
