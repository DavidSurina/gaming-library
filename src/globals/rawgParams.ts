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

const bestGames: Partial<GameParams> = {
  ordering: "-rating",
  metacritic: "90,100",
  dates: `1990,${currentDate}`,
  exclude_additions: "true",
};

const latestReleases: Partial<GameParams> = {
  ordering: "-released",
  metacritic: "50,100",
  dates: `${lastYear},${currentDate}`,
  // exclude_additions: "true",
};

const upcomingGames: Partial<GameParams> = {
  ordering: "-added",
  dates: `${currentDate},${nextYear}`,
};

export const rawgParams = {
  bestGames,
  latestReleases,
  upcomingGames,
};
