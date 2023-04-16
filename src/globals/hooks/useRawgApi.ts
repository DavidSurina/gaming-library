function useRawgApi() {
  const baseGamingUrl = "https://api.rawg.io/api/";

  const currentYear = new Date().getFullYear();
  const lastYear = `${currentYear - 1}`;
  const trendingGamesUrl = `${baseGamingUrl}games?kdates=${lastYear},${currentYear}&ordering=-rating&page_size=10&key=${
    process.env.REACT_APP_GAMING_LIBRARY_API_KEY as string
  }`;

  const getTrendingGames = async () => {
    const res = await fetch(trendingGamesUrl, {
      method: "GET",
    });
    return res.json;
  };

  return {
    baseGamingUrl,
    getTrendingGames,
  };
}

export default useRawgApi;
