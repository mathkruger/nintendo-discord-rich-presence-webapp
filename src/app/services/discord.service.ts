import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor(private httpClient: HttpClient) {}

  updateDiscord(gameName: string) {
    return this.httpClient.get<any[]>(environment.serverUrl + `discord/update?state=${gameName}`);
  }

  removePresence() {
    return this.httpClient.get<any[]>(environment.serverUrl + `discord/remove`);
  }
}
