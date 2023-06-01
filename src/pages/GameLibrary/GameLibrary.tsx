import React, { useId, useRef, useEffect, ChangeEvent } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLibContext } from "globals/contexts/LibraryContext";

import { Form } from "react-bootstrap";
import GameTile from "components/GameTile/GameTile";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import SearchInput from "components/SearchInput/SearchInput";

import { RawgApiService, formatParams } from "globals/functions/api";
import { Game, GamesResults } from "globals/types/rawgTypes";
import { rawgParams } from "globals/rawgParams";
import "./style.scss";

function GameLibrary() {
  const id = useId();
  const gameRef = useRef<HTMLDivElement>(null);
  const { getRawgData } = RawgApiService;
  const { queryParams, setQueryParams, initialUrl } = useLibContext();

  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<GamesResults>({
      queryKey: [queryParams.queryKey, initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getRawgData(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const formattedParams = formatParams(
      rawgParams[`${e.target.value}` as keyof typeof rawgParams]
    );

    setQueryParams((prevState) => ({
      ...prevState,
      queryKey: e.target.value,
      params: formattedParams,
    }));
  };

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

  if (error) return <div>{`Request Failed - ${error}`}</div>;
  console.log(data);
  return (
    <section>
      <div className="filtering-wrapper">
        <Form.Select
          size="lg"
          className="m-3"
          style={{ width: "45%" }}
          onChange={handleSelect}
        >
          <option value="bestGames">Best Games</option>
          <option value="latestReleases">Latest Releases</option>
        </Form.Select>
        <SearchInput />
      </div>
      {!isLoading && data?.pages && (
        <div className="tiles-wrapper">
          {data.pages.map((group: GamesResults) => {
            return group.results.map((game: Game) => {
              return <GameTile game={game} key={`${id}${game.name}`} />;
            });
          })}
          {data?.pages[0].count === 0 && (
            <div style={{ textAlign: "center" }}>No Results</div>
          )}
          {!hasNextPage && !isFetching && data?.pages[0]?.count > 0 && (
            <div style={{ textAlign: "center" }}>No more entries</div>
          )}
        </div>
      )}
      {data && <span ref={gameRef} />}
      {isFetching && <LoadingSpinner />}
    </section>
  );
}

export default GameLibrary;
