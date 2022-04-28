import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSelectorComponent } from './pages/game-selector/game-selector.component';
import { MyLibraryComponent } from './pages/my-library/my-library.component';
import { NintendoLoginComponent } from './pages/nintendo-login/nintendo-login.component';
import { RealtimePresenceComponent } from './pages/realtime-presence/realtime-presence.component';

const routes: Routes = [
  {
    path: '',
    component: GameSelectorComponent
  },
  {
    path: 'library',
    component: MyLibraryComponent
  },
  {
    path: 'realtime',
    component: RealtimePresenceComponent
  },
  {
    path: 'nintendo-login',
    component: NintendoLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
