import React from "react";
import { useQuery } from "@tanstack/react-query";
import useRawgApi from "globals/hooks/useRawgApi";
import GameTile from "components/GameTile/GameTile";

function Home() {
  const { getTrendingGames } = useRawgApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trendingGames"],
    queryFn: getTrendingGames,
  });
  if (error) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="top-games_wrapper">
        {data.result &&
          data.result.map((item: unknown) => {
            return <GameTile name={item?.name as string} />;
          })}
      </div>
    </section>
  );
}

export default Home;
