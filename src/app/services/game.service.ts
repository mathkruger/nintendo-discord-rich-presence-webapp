import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {}

  currentSelectedGame = new BehaviorSubject<any>(null);

  searchGame(term: string) {
    const access_token = window.localStorage.getItem('access_token');
    return this.httpClient.get<any[]>(environment.serverUrl + 'game/info?term=' + term, {
      headers: {
        'authorization': 'Bearer ' + access_token
      }
    });
  }

  getGameThumbnail(id: number) {
    const access_token = window.localStorage.getItem('access_token');
    return this.httpClient.get<any>(environment.serverUrl + 'game/cover?id=' + id, {
      headers: {
        'authorization': 'Bearer ' + access_token
      }
    });
  }

  setCurrentSelectedGame(game: any) {
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
