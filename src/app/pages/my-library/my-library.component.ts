import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Library } from 'src/app/models/library';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit {

  constructor(
    private libraryService: LibraryService,
    private discordService: DiscordService,
    private gameService: GameService,
    private router: Router
  ) { }

  library: Library | null = null;

  ngOnInit() {
    this.library = this.libraryService.get();
  }

  selectGame(game: Game) {
    window.localStorage.setItem('currentGame', JSON.stringify(game));

    this.discordService.updateDiscord(game.title, 'playing', 'https://www.nintendo.com' + game.url).subscribe(() => {
      this.libraryService.increaseTimePlayed(game);
      this.gameService.setCurrentSelectedGame(game);
      this.router.navigate([""]);
    });
  }

  removeGameFromLibrary(game: Game) {
    const confirmed = confirm(`Deseja realmente remover esse jogo da sua biblioteca?
    Todo o histório será excluido e não poderá ser recuperado!`);

    if (confirmed) {
      this.libraryService.remove(game);
      this.library = this.libraryService.get();
    }
  }

}
