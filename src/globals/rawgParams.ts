import { GameParams } from "./types/rawgTypes";

const currentYear = new Date().getFullYear();

export const trendingGamesParams: Partial<GameParams> = {
  ordering: "-rating",
  metacritic: "90,100",
  kdates: `2015,${currentYear}`,
  exclude_additions: "true",
};
