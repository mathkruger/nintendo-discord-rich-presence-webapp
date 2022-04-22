import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit {

  constructor(private gameService: GameService) { }

  gameList: Game[] = [];
  loading = false;

  ngOnInit() {
  }

  searchGame(term: string) {
    this.loading = true;
    this.gameList = [];
    this.gameService.searchGame(term).subscribe(items => {
      this.loading = false;
      this.gameList = items;
    });
  }

}
