import React, { useId, Fragment, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import GameTile from "components/GameTile/GameTile";
import { Game, GamesResults } from "globals/types/rawgTypes";
import "./style.scss";
import {
  RawgApiService,
  formatParams,
  rawgSubUrls,
} from "globals/functions/api";
import { trendingGamesParams } from "globals/rawgParams";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

function GameLibrary() {
  const id = useId();
  const gameRef = useRef<HTMLSpanElement>(null);
  const { getBestGames } = RawgApiService;
  const initialUrl = `${rawgSubUrls.game}?${formatParams(trendingGamesParams)}`;
  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery<GamesResults>({
      queryKey: ["bestGames", initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getBestGames(pageParam),
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        return lastPage.next;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(() => fetchNextPage());

    if (gameRef.current) {
      observer.observe(gameRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [gameRef]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{`Request Failed - ${error}`}</div>;

  return (
    <section>
      <div className="filtering-wrapper">
        <h3>Filtering...</h3>
      </div>
      <div className="tiles-wrapper">
        {data?.pages &&
          data.pages.map((group: GamesResults, dataIndex) => {
            return (
              <Fragment key={dataIndex}>
                {group.results.map((game: Game, resultIndex) => {
                  return <GameTile game={game} key={`${id}${game.name}`} />;
                })}
              </Fragment>
            );
          })}
        <span ref={gameRef} className="observer"></span>
      </div>
      <div>{isFetching && <LoadingSpinner />}</div>
    </section>
  );
}

export default GameLibrary;
