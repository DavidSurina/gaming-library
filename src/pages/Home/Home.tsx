import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "globals/contexts/AppContext";

function Home() {
  const { trendingGamesUrl, baseGamingUrl } = useAppContext();
  const getTrendingGames = async () => {
    const res = await fetch(trendingGamesUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": baseGamingUrl,
        key: process.env.REACT_APP_GAMING_LIBRARY_API_KEY as string,
      },
    });
    return res.json;
  };

  const { data, isLoading, error } = useQuery(
    ["trendingGames"],
    getTrendingGames
  );

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <section>
      <div className="top-games_wrapper"></div>
    </section>
  );
}

export default Home;
