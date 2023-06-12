import React, { useId, useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  CurrentQueryType,
  useLibContext,
} from "globals/contexts/LibraryContext";
import { UseSelectStateChange } from "downshift";
import { Filter } from "react-bootstrap-icons";

import GameTile from "components/GameTile/GameTile";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Select from "../../components/Select/Select";
import SearchInput from "components/SearchInput/SearchInput";

import { RawgApiService, formatParams } from "globals/functions/api";
import { Game, GamesResults } from "globals/types/rawgTypes";
import { rawgParams } from "globals/rawgParams";
import "./style.scss";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { Button } from "react-bootstrap";

function getSelectData(): CurrentQueryType[] {
  return Object.entries(rawgParams).map(([key, value]) => {
    return {
      queryKey: key,
      params: formatParams(value),
    };
  });
}

function GameLibrary() {
  const id = useId();
  const gameRef = useRef<HTMLDivElement>(null);
  const { getRawgData } = RawgApiService;
  const { currentQuery, setCurrentQuery, initialUrl } = useLibContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<GamesResults>({
      queryKey: [currentQuery.queryKey, initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getRawgData(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleSelect = (e: UseSelectStateChange<CurrentQueryType>) => {
    setCurrentQuery((prevState) => ({
      ...prevState,
      queryKey: e.selectedItem?.queryKey as string,
      params: e.selectedItem?.params as string,
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

  return (
    <section>
      <div className="filtering-wrapper">
        <Select
          items={getSelectData()}
          onSelectedItemChange={(e) => handleSelect(e)}
          initialSelectedItem={currentQuery}
        />
        <SearchInput />
        <Button
          className="filtering-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Filter size="25" />
        </Button>
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
      <FilterMenu open={menuOpen} handleClose={handleClose} />
    </section>
  );
}

export default GameLibrary;
