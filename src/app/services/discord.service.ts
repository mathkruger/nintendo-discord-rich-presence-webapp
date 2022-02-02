import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor(private httpClient: HttpClient) {}

  updateDiscord(gameName: string, state: 'playing' | 'paused' | 'no-game') {
    const params = new HttpParams()
    .set('state', state)
    .set('details', encodeURI(gameName));
    return this.httpClient.get<any[]>(environment.serverUrl + `discord/update`, {
      params: params
    });
  }
}
