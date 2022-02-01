import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit {

  constructor(private gameService: GameService) { }

  gameList: any[] = [];

  ngOnInit() {
  }

  searchGame(term: string) {
    this.gameService.searchGame(term).subscribe(items => {
      this.gameList = items;
    });
  }

}
