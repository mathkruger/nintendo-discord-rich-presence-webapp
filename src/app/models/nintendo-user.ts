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