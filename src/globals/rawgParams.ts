import { GameParams } from "./types/rawgTypes";

const getCurrentMonth = function () {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = function () {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const best_games: Partial<GameParams> = {
  ordering: "-rating",
  metacritic: "90,100",
  dates: `1990,${currentDate}`,
  exclude_additions: "true",
};

const latest_releases: Partial<GameParams> = {
  ordering: "-released",
  metacritic: "50,100",
  dates: `${lastYear},${currentDate}`,
  // exclude_additions: "true",
};

const upcoming_games: Partial<GameParams> = {
  ordering: "-added",
  dates: `${currentDate},${nextYear}`,
};

export const genres = {
  action: "action",
  indie: "indie",
  racing: "racing",
  adventure: "adventure",
  RPG: "role-playing-games-rpg",
  strategy: "strategy",
  shooter: "shooter",
  casual: "casual",
  simulation: "simulation",
  puzzle: "puzzle",
  arcade: "arcade",
  platformer: "platformer",
  mmo: "massively-multiplayer",
  sports: "sports",
  fighting: "fighting",
  family: "family",
  board: "board-games",
  educational: "educational",
  card: "card",
};

export const platform = {
  PC: "pc",
  "Playstation 5": "playstation5",
  "Xbox One": "xbox-one",
  "Playstation 4": "playstation4",
  "Xbox Series X": "xbox-series-x",
  "Nintendo Switch": "nintendo-switch",
  iOS: "ios",
  Android: "android",
  "Nintendo 3DS": "nintendo-3ds",
  "Nintendo DS": "nintendo-ds",
  "Nintendo DSi": "nintendo-dsi",
  macOS: "macos",
  Linux: "linux",
  "Xbox 360": "xbox360",
  Xbox: "xbox-old",
  "Playstation 3": "playstation3",
  "Playstation 2": "playstation2",
  Playstation: "playstation1",
  "PS-Vita": "ps-vita",
  PSP: "psp",
  "Wii U": "wii-u",
  Wii: "wii",
  GameCube: "game-cube",
  "Nintendo 64": "nintendo-64",
  "Game Boy Advance": "game-boy-advance",
  "Game Boy Color": "game-boy-color",
  "Game Boy": "game-boy",
  SNES: "snes",
  "3D0": "3do",
  Dreamcast: "dreamcast",
  "Sega Master System": "sega-master-system",
  "Sega 32X": "sega-32x",
  "Sega CD": "sega-cd",
};

export const publishers = {
  "Electronic Arts": "electronic-arts",
  "Square Enix": "square-enix",
  "Ubisoft Enterntainment": "ubisoft-enterntainment",
  "Microsoft Studios": "microsoft-studios",
  SEGA: "sega-2",
  "2K Games": "2k-games",
  "Bethesda Softworks": "bethesda-softworks",
  "Feral Interactive": "feral-interactive",
  Valve: "valve",
  Capcom: "capcom",
  Nintendo: "nintendo",
};

export const rawgParams = {
  "Best Games": best_games,
  "Latest Releases": latest_releases,
  "Upcoming Games": upcoming_games,
};
