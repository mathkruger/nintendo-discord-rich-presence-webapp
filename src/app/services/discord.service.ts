import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor(private httpClient: HttpClient) {}

  updateDiscord(
    gameName: string,
    state: 'playing' | 'lobby' | 'paused' | 'no-game',
    friendCode: string | null = null,
    eshopUrl: string | null = null
  ) {
    const params = new HttpParams()
    .set('state', state)
    .set('details', encodeURI(gameName))
    .set('friendCode', friendCode || '')
    .set('eshopUrl', encodeURIComponent(eshopUrl || ''));

    params.keys().forEach(key => {
      if (params.get(key) === '') {
        params.delete(key);
      }
    });
    
    return this.httpClient.get<any[]>(environment.serverUrl + `discord/update`, {
      params: params
    });
  }
}
