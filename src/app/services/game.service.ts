import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {}

  currentSelectedGame = new BehaviorSubject<Game | null>(null);

  searchGame(term: string) {
    return this.httpClient.get<Game[]>(environment.serverUrl + 'game/info?term=' + term);
  }

  setCurrentSelectedGame(game: Game | null) {
    if (game) {
      window.localStorage.setItem('currentGame', JSON.stringify(game));
    }
    else {
      window.localStorage.removeItem('currentGame');
    }
    
    this.currentSelectedGame.next(game);
  }

  getCurrentSelectedGame() {
    return this.currentSelectedGame.asObservable();
  }
}
