import React from "react";
import { useQuery } from "@tanstack/react-query";
import useRawgApi from "globals/hooks/useRawgApi";
import GameTile from "components/GameTile/GameTile";
import { Game, GamesResults } from "globals/types/gameTypes";

function Home() {
  const { getTrendingGames } = useRawgApi();

  const { data, isLoading, error } = useQuery<GamesResults>({
    queryKey: ["trendingGames"],
    queryFn: getTrendingGames,
  });
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="top-games_wrapper">
        {data?.results &&
          data.results.map((item: Game) => {
            return <GameTile name={item?.name as string} />;
          })}
      </div>
    </section>
  );
}

export default Home;
