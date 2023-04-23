import axios from "axios";
import { trendingGamesParams } from "globals/rawgParams";
import { GamesResults } from "globals/types/rawgTypes";

export const baseRawgUrl = "https://api.rawg.io/api";

export const rawgSubUrls = {
  game: "/games",
};

const rawgClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  headers: {
    "Content-type": "application/json",
  },
});

export function formatParams(paramsObj: Record<string, string>) {
  return Object.keys(paramsObj)
    .map((param) => `&${param}=${paramsObj[param]}`)
    .join("");
}

export const getRawgData = async (
  url: string,
  _params: Record<string, string>
) => {
  const params = formatParams(_params);
  return await rawgClient.get<GamesResults>(
    baseRawgUrl +
      url +
      "?key=" +
      process.env.REACT_APP_GAMING_LIBRARY_API_KEY +
      params
  );
};

const getBestGames = async () => {
  const response = await getRawgData("/games", trendingGamesParams);
  return response.data;
};

export const RawgApiService = {
  getBestGames,
};
