import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { NintendoUser } from 'src/app/models/nintendo-user';
import { DiscordService } from 'src/app/services/discord.service';
import { GameService } from 'src/app/services/game.service';
import { NintendoService } from 'src/app/services/nintendo.service';

@Component({
  selector: 'app-realtime-presence',
  templateUrl: './realtime-presence.component.html',
  styleUrls: ['./realtime-presence.component.css']
})
export class RealtimePresenceComponent implements OnInit, OnDestroy {

  updateInterval: any = null;
  previousGame: Game | null = null;
  user: NintendoUser | null = null;

  statusLabels = {
    ONLINE: 'Online',
    INACTIVE: 'Inativo',
    OFFLINE: 'Offline'
  }

  constructor(
    private nintendoService: NintendoService,
    private gameService: GameService,
    private discordService: DiscordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.nintendoService.isLoggedIn()) {
      this.router.navigate(['nintendo-login']);
    }

    const userName = this.nintendoService.getUsername();
    if (userName) {
      this.startUpdate(userName);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  startUpdate(username: string) {
    this.useRealtimePresence(username);
    
    this.updateInterval = setInterval(() => {
      this.useRealtimePresence(username);
    }, 30000);
  }

  useRealtimePresence(username: string) {
    this.nintendoService.getUserPresence(username)?.subscribe(user => {
      this.user = user;

      if (this.previousGame?.title !== this.user.presence.game.name) {
        if (this.user.presence.state === "ONLINE") {
          const game = <Game>{
            title: this.user.presence.game.name,
            horizontalHeaderImage: this.user.presence.game.imageUri
          };
  
          this.discordService.updateDiscord(game.title, 'playing').subscribe(() => {
            this.previousGame = game;
            this.gameService.setCurrentSelectedGame(game);
          });
        }
        else {
          this.discordService.updateDiscord('💤💤💤', 'no-game').subscribe(() => {
            this.previousGame = null;
            this.gameService.setCurrentSelectedGame(null);
          });
        }
      }
    });
  }

}
