import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor(private httpClient: HttpClient) {}

  updateDiscord(gameName: string) {
    const access_token = window.localStorage.getItem('access_token');
    return this.httpClient.get<any[]>(environment.serverUrl + `discord/update?state=${gameName}`, {
      headers: {
        'authorization': 'Bearer ' + access_token
      }
    });
  }

}
