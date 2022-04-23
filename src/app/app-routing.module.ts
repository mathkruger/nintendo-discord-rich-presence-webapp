import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSelectorComponent } from './pages/game-selector/game-selector.component';
import { MyLibraryComponent } from './pages/my-library/my-library.component';

const routes: Routes = [
  {
    path: '',
    component: GameSelectorComponent
  },
  {
    path: 'library',
    component: MyLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
