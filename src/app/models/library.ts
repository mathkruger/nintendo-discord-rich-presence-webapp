import { Game } from "./game";

export interface Library {
    items: LibraryItem[];
}

export interface LibraryItem {
    game: Game;
    timesPlayed: number;
}