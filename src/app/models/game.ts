export interface Game {
    /** Whether this game is available or not */
    availability: string[];
    /** The box art of the game, if any. Generally undefined for games that are yet to release. */
    boxart?: string;
    /** A description about this game */
    description: string;
    /** A list of companies that developed this game */
    developers: string[];
    /** A list of {@link https://www.esrb.org/ratings-guide/ ESRB descriptors} */
    esrbDescriptors: string[];
    /** The {@link https://www.esrb.org/ratings-guide/ ESRB Rating} */
    esrbRating: string;
    /** Whether this game is featured on the {@link https://www.nintendo.com nintendo.com} homepage */
    featured: boolean;
    /** The franchises this game is a part of */
    franchises: string;
    /** Whether this game is free to start */
    freeToStart: boolean;
    /** A list of general filters that could potentially be searched on {@link https://www.nintendo.com nintendo.com} to find this game with */
    generalFilters: string[];
    /**  A list of genres this game */
    genres: string[];
    /** A large wide image such as a screenshot or artwork of the game, if any. */
    horizontalHeaderImage?: string;
    /** A list of methods through which the game can be acquired, such as retail or digital download. */
    howToShop: string[];
    /** A Unix timestamp in **milliseconds** indicating when the information on this game was last modified */
    lastModified: number;
    /** The lowest price at which this game was ever sold */
    lowestPrice: number;
    /** The {@link https://en.wikipedia.org/wiki/List_price manufacturer's suggested retail price} for this game */
    msrp: number;
    /** The unique ID for this game. */
    nsuid: string;
    /** The amount of players that can simultaneously play this game */
    numOfPlayers: string;
    /** A unique {@link https://en.wikipedia.org/wiki/Universally_unique_identifier GUID} that represents this game's entry in the Nintendo API.  */
    objectID: string;
    /** The platform this game released on */
    platform: string;
    /** A list of player filters that could potentially be searched on {@link https://www.nintendo.com nintendo.com} to find this game with */
    playerFilters: string[];
    /** A category price range that this game falls under. Can be used on {@link https://www.nintendo.com nintendo.com} to find this game with */
    priceRange: string;
    /** A list of companies that published this game */
    publishers: string[];
    /**
     * A display of the release of this game. Can be either an ISO timestamp or some other representation of date.
     * @remark Nintendo has a tendency to also have entries such as `Early 2022` or `Late 2021` here. Normally these kinds of dates would not be parsed by JavaScript, but NodeJS does parse these natural input types.
     */
    releaseDateDisplay: string;
    /** The price of this game if and when it is on sale */
    salePrice: number | null;
    /** A unique {@link https://en.wikipedia.org/wiki/Clean_URL#Slug slug} for this game */
    slug: string;
    /** The title of this game */
    title: string;
    /** A unique to the information about this game. Prefix it with `https://www.nintendo.com` to have a valid URL. */
    url: string;
    /** Additional information returned by the API, it doesn't really serve any purpose but documenting it anyway because it's there. */
    _distinctSeqID: number;
}