import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { NintendoService } from 'src/app/services/nintendo.service';

@Component({
  selector: 'app-nintendo-login',
  templateUrl: './nintendo-login.component.html',
  styleUrls: ['./nintendo-login.component.css']
})
export class NintendoLoginComponent implements OnInit {

  constructor(
    private nintendoService: NintendoService,
    private router: Router,
    private loaderSerivce: LoaderService
  ) { }

  
  receivedUrl: string | null = null;
  username: string | null = null;


  authLogin: {
    url: string,
    codeVerifier: string
  } | null = null;

  ngOnInit() {
    if (this.nintendoService.isLoggedIn()) {
      this.router.navigate(['realtime']);
    }

    this.getAuthLogin();
  }

  getAuthLogin() {
    this.nintendoService.getAuthURL().subscribe(item => {
      this.authLogin = item;
    });
  }

  login() {
    if (this.receivedUrl && this.username) {
      this.loaderSerivce.setLoader(true);

      this.nintendoService.getAuthToken(this.receivedUrl, this.authLogin?.codeVerifier || '').pipe(
        finalize(() => {
          this.loaderSerivce.setLoader(false);
        }),
        catchError(err => {
          alert(err);
          throw new Error(err);
        })
      ).subscribe(item => {
        this.nintendoService.setUsername(this.username || '');
        this.nintendoService.setToken(item);
        this.router.navigate(['realtime']);
      });
    }
  }

}
