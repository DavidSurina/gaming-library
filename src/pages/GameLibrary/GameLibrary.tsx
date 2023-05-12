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
  const gameRef = useRef<HTMLDivElement>(null);
  const { getBestGames } = RawgApiService;
  const initialUrl = `${rawgSubUrls.game}?${formatParams(trendingGamesParams)}`;
  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<GamesResults>({
      queryKey: ["bestGames", initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getBestGames(pageParam),
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        return lastPage.next;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (entry.isIntersecting && hasNextPage) {
            console.log("gets fetched");
            fetchNextPage();
          }
        });
      },
      {
        rootMargin: "0px 0px 400px 0px",
        threshold: 0,
      }
    );

    if (gameRef.current) {
      observer.observe(gameRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [gameRef.current, isLoading, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{`Request Failed - ${error}`}</div>;

  return (
    <section>
      <div className="filtering-wrapper">
        <h3>Filtering...</h3>
      </div>
      {data?.pages && (
        <div className="tiles-wrapper">
          {data.pages.map((group: GamesResults, dataIndex) => {
            return group.results.map((game: Game, resultIndex) => {
              return <GameTile game={game} key={`${id}${game.name}`} />;
            });
          })}
          <span ref={gameRef} />
        </div>
      )}
      {isFetching && <LoadingSpinner />}
      {!hasNextPage && <div>No more entries</div>}
    </section>
  );
}

export default GameLibrary;
