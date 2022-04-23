import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Library, LibraryItem } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  libraryKey = "myLibrary";

  get(): Library {
    return JSON.parse(localStorage.getItem(this.libraryKey) || '{"items": []}');
  }

  save(library: Library) {
    localStorage.setItem(this.libraryKey, JSON.stringify(library));
  }

  add(game: Game) {
    const library: Library = this.get();
    const newItem: LibraryItem = {
      game,
      timesPlayed: 0
    }
    library.items.push(newItem);
    library.items = [...new Set(library.items)];
    this.save(library);
  }

  remove(game: Game) {
    const library: Library = this.get();
    const index = library.items.findIndex(x => x.game.nsuid === game.nsuid);
    library.items.splice(index, 1);
    this.save(library);
  }

  increaseTimePlayed(game: Game) {
    const library: Library = this.get();
    const index = library.items.findIndex(x => x.game.nsuid === game.nsuid);
    library.items[index].timesPlayed += 1;
    this.save(library);
  }

}
