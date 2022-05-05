import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
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
    return JSON.parse(localStorage.getItem('nintendo_token') || '{"accessToken": "", "sessionToken": ""}');
  }

  setToken(token: any) {
    localStorage.setItem('nintendo_token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('nintendo_session_token');
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
    const token = this.getToken().accessToken;
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

  renewAuthToken(): Observable<any> {
    const sessionToken = this.getToken().sessionToken;
    return this.httpClient
      .get<any>(environment.serverUrl + `nintendo/token/renew?sessionToken=${sessionToken}`)
      .pipe(
        map(item => {
          this.setToken({
            sessionToken: this.getToken().sessionToken,
            accessToken: item.accessToken,
          });
        })
      );
  }

  getUserData() {
    return this.handleTokenExpiration<NintendoUser>(
      this.httpClient
      .get<NintendoUser>(environment.serverUrl + `nintendo/user`, {
        headers: {
          authorization: 'Bearer ' + this.getToken().accessToken
        }
      })
    );
  }

  getUserPresence(username: string) {
    return this.handleTokenExpiration<NintendoUser>(
      this.httpClient
      .get<NintendoUser>(environment.serverUrl + `nintendo/presence?userToTrack=${username}`, {
        headers: {
          authorization: 'Bearer ' + this.getToken().accessToken
        }
      })
    );
  }

  handleTokenExpiration<TReturn>(requisition: Observable<TReturn>) {
    if (!this.isTokenValid()) {
      return this.renewAuthToken().pipe(
        switchMap(() => {
          return requisition
        })
      )
    }

    return requisition;
  }
}
