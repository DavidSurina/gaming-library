import { GameParams } from "./types/rawgTypes";

const currentYear = new Date().getFullYear();
const lastYear = currentYear - 1;

const bestGames: Partial<GameParams> = {
  ordering: "-rating",
  metacritic: "90,100",
  dates: `1990,${currentYear}`,
  exclude_additions: "true",
};

const latestReleases: Partial<GameParams> = {
  ordering: "-released",
  metacritic: "50,100",
  dates: `${lastYear},${currentYear}`,
  // exclude_additions: "true",
};

export const rawgParams = {
  bestGames,
  latestReleases,
};
