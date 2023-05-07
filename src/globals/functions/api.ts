import axios from "axios";
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
  _params?: Record<string, string>
) => {
  let params = "";
  if (_params) {
    params = formatParams(_params);
  }

  const urlString = _params
    ? url + "?key=" + process.env.REACT_APP_GAMING_LIBRARY_API_KEY + params
    : `${url}&key=${process.env.REACT_APP_GAMING_LIBRARY_API_KEY}`;

  return await rawgClient.get<GamesResults>(urlString);
};

const getBestGames = async (url: string) => {
  console.log(url);
  const response = await getRawgData(url);
  return response.data;
};

export const RawgApiService = {
  getBestGames,
};
