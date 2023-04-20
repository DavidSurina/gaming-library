import React from "react";
import { useQuery } from "@tanstack/react-query";
import useRawgApi from "globals/hooks/useRawgApi";
import GameTile from "components/GameTile/GameTile";
import { Game, GamesResults } from "globals/types/gameTypes";
import "./style.scss";

function Home() {
  const { getTrendingGames } = useRawgApi();

  const { data, isLoading, error } = useQuery<GamesResults>({
    queryKey: ["trendingGames"],
    queryFn: getTrendingGames,
  });
  console.log(process.env.REACT_APP_GAMING_LIBRARY_API_KEY);
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="tiles-wrapper">
      {data?.results &&
        data.results.map((item: Game) => {
          return <GameTile name={item?.name as string} />;
        })}
    </section>
  );
}

export default Home;
