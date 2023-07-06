import axios from "axios";
import { CurrentQueryType } from "../contexts/LibraryContext";
import { type } from "@testing-library/user-event/dist/type";

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

export function formatParams(
  paramsObj: Record<string, string | CurrentQueryType[]>
) {
  return Object.keys(paramsObj)
    .map((param) => {
      if (paramsObj[param].length === 0) {
        return "";
      }
      if (typeof paramsObj[param] === "object") {
        const par = (paramsObj[param] as CurrentQueryType[]).map(
          (item) => item[1]
        );
        return `&${param}=${par.join(",")}`;
      } else {
        return `&${param}=${paramsObj[param]}`;
      }
    })
    .join("");
}

async function getRawgData<T>(
  url: string,
  _params?: Record<string, string>
): Promise<T> {
  let params = "";
  if (_params) {
    params = formatParams(_params);
  }

  const urlString = _params
    ? url + "?key=" + process.env.REACT_APP_GAMING_LIBRARY_API_KEY + params
    : `${url}&key=${process.env.REACT_APP_GAMING_LIBRARY_API_KEY}`;
  const response = await rawgClient.get<T>(urlString);
  return response.data;
}

export const RawgApiService = {
  getRawgData,
};
