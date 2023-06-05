import React, { useId, useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Form } from "react-bootstrap";
import GameTile from "components/GameTile/GameTile";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

import {
  RawgApiService,
  formatParams,
  rawgSubUrls,
} from "globals/functions/api";
import { Game, GameParams, GamesResults } from "globals/types/rawgTypes";
import "./style.scss";
import { rawgParams } from "globals/rawgParams";

function GameLibrary() {
  const id = useId();
  const gameRef = useRef<HTMLDivElement>(null);
  const { getRawgData } = RawgApiService;
  const [selectValue, setSelectValue] = useState("bestGames");
  console.log(selectValue);
  const initialUrl = `${rawgSubUrls.game}?${formatParams(
    rawgParams[`${selectValue}` as keyof typeof rawgParams]
  )}`;
  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<GamesResults>({
      queryKey: [selectValue, initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getRawgData(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasNextPage) return;
          if (entry.isIntersecting) {
            console.log("gets fetched");
            fetchNextPage();
          }
        });
      },
      {
        rootMargin: "0px 0px 400px 0px",
      }
    );

    if (gameRef.current && hasNextPage) {
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
        <Form.Select
          size="lg"
          style={{ width: "50%", margin: "1rem" }}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="bestGames">Best Games</option>
          <option value="latestReleases">Latest Releases</option>
        </Form.Select>
      </div>
      {data?.pages && (
        <div className="tiles-wrapper">
          {data.pages.map((group: GamesResults, dataIndex) => {
            return group.results.map((game: Game, resultIndex) => {
              return <GameTile game={game} key={`${id}${game.name}`} />;
            });
          })}
        </div>
      )}
      {data && <span ref={gameRef} />}
      {isFetching && <LoadingSpinner />}
      {!hasNextPage && !isFetching && (
        <div style={{ textAlign: "center" }}>No more entries</div>
      )}
    </section>
  );
}

export default GameLibrary;
