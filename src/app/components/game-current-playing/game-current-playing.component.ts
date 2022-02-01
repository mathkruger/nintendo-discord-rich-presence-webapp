import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-current-playing',
  templateUrl: './game-current-playing.component.html',
  styleUrls: ['./game-current-playing.component.css']
})
export class GameCurrentPlayingComponent implements OnInit {

  constructor(private gameService: GameService) { }

  currentGame: any;

  ngOnInit() {
    this.gameService.getCurrentSelectedGame().subscribe(item => {
      this.currentGame = item;
    });
  }

}
