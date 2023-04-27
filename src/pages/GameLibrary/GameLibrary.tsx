import React, { useId } from "react";
import { useQuery } from "@tanstack/react-query";
import GameTile from "components/GameTile/GameTile";
import { Game, GamesResults } from "globals/types/rawgTypes";
import "./style.scss";
import { RawgApiService } from "globals/functions/api";

function GameLibrary() {
  const id = useId();
  const { getBestGames } = RawgApiService;
  const { data, isLoading, error } = useQuery<GamesResults>({
    queryKey: ["bestGames"],
    queryFn: getBestGames,
  });

  if (error) return <div>{`Request Failed - ${error}`}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="filtering-wrapper">
        <h3>Filtering...</h3>
      </div>
      <div className="tiles-wrapper">
        {data?.results &&
          data.results.map((item: Game) => {
            return <GameTile game={item} key={`${id}${item.name}`} />;
          })}
      </div>
    </section>
  );
}

export default GameLibrary;
