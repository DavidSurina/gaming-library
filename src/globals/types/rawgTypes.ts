export type Platforms = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Tags = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  language: string;
  image_background: string;
};

export type Genres = {
  id: number;
  name: string;
  slug: string;
};

export type Publishers = {
  name: string;
}; // TODO add type for this

export type Game = {
  slug: string;
  name: string;
  platforms: Platforms[];
  publishers: Publishers[];
  released: string;
  background_image: string;
  metacritic: number;
  id: number;
  tags?: Tags[];
  genres: Genres[];
};

export type GamesResults = {
  count: number;
  next: string;
  results: Game[];
};

export type GameParams = {
  dates: string;
  kdates: string;
  ordering: string;
  metacritic: string;
  exclude_additions: string;
};
