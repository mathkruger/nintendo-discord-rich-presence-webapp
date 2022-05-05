import { Game } from "./game";

export interface NintendoUser {
    id: number;
    nsaId: string;
    imageUri: string;
    name: string;
    isFriend: boolean;
    isFavoriteFriend: boolean;
    isServiceUser: boolean;
    friendCreatedAt: number;
    presence: NintendoPresence;
}

export interface NintendoPresence {
    state: 'INACTIVE' | 'OFFLINE' | 'ONLINE';
    updatedAt: number;
    logoutAt: number;
    game: NintendoGame;
}

export interface NintendoGame {
    name: string;
    imageUri: string;
    shopUri: string;
    totalPlayTime: number;
    firstPlayedAt: number;
    sysDescription: string;
}

export interface CustomTime {
    hours: number;
    minutes: number;
    seconds: number;
}

export function presenceGameToEshopGame(game: NintendoGame) {
    return <Game>{
        title: game.name,
        horizontalHeaderImage: game.imageUri,
        url: game.shopUri,
        totalPlaytime: secondsToDate(game.totalPlayTime * 60),
        firstPlayedAt: new Date(game.firstPlayedAt * 1000)
    };
}

export function secondsToDate(d: number) {
    const hours = Math.floor(d / 3600);
    const minutes = Math.floor(d % 3600 / 60);
    const seconds = Math.floor(d % 3600 % 60);

    return <CustomTime>{
        hours,
        minutes,
        seconds
    }
}