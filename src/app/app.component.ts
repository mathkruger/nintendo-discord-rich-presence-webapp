import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DiscordService } from './services/discord.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private discordService: DiscordService) {

  }

  isLoading = true;

  ngOnInit(): void {
    this.authService.getAuthToken().subscribe(auth => {
      window.localStorage.setItem('access_token', auth.access_token);

      const currentGame = window.localStorage.getItem('currentGame');

      if (currentGame) {
        const gameObject = JSON.parse(currentGame);
        this.discordService.updateDiscord(gameObject.name).subscribe(() => {
            this.gameService.setCurrentSelectedGame(gameObject);
        });
      }

      this.isLoading = false;
    });
  }

  title = 'nintendo-discord-rich-presence-webapp';
}
