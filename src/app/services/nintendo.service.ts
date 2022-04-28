import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NintendoUser } from '../models/nintendo-user';

@Injectable({
  providedIn: 'root'
})
export class NintendoService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  isLoggedIn() {
    return localStorage.getItem('nintendo_token') != null;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('nintendo_token') || '{"accessToken": ""}').accessToken;
  }

  setToken(token: any) {
    localStorage.setItem('nintendo_token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('nintendo_token');
  }

  getUsername() {
    return localStorage.getItem('nintendo_username');
  }

  setUsername(username: string) {
    localStorage.setItem('nintendo_username', username);
  }

  removeUsername() {
    localStorage.removeItem('nintendo_username');
  }

  isTokenValid() {
    const token = this.getToken();
    const tokenInformation = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenInformation.exp * 1000);
    return new Date() < expirationDate;
  }

  logout() {
    this.removeToken();
    this.removeUsername();
    this.router.navigate(['nintendo-login']);
  }

  getAuthURL() {
    return this.httpClient
      .get<any>(environment.serverUrl + `nintendo/auth`);
  }

  getAuthToken(receivedUrl: string, verifier: string) {
    return this.httpClient
      .get<any>(environment.serverUrl + `nintendo/token?receivedUrl=${encodeURIComponent(receivedUrl)}&verifier=${verifier}`)
      .pipe(
        retry(3)
      );
  }

  getUserData() {
    this.handleToken();

    return this.httpClient
    .get<NintendoUser>(environment.serverUrl + `nintendo/user`, {
      headers: {
        authorization: 'Bearer ' + this.getToken()
      }
    });
  }

  getUserPresence(username: string) {
    this.handleToken();

    return this.httpClient
    .get<NintendoUser>(environment.serverUrl + `nintendo/presence?userToTrack=${username}`, {
      headers: {
        authorization: 'Bearer ' + this.getToken()
      }
    });
  }

  handleToken() {
    if (!this.isTokenValid()) {
      this.logout();
      return;
    }
  }

}
