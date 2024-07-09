import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { useMutation } from "@tanstack/react-query";

import SearchSuggestionList from "../SearchSuggestionList/SearchSuggestionList";
import { GamesResultsType } from "globals/types/rawgTypes";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/rawgApi";

import "./style.scss";

function NavSearch() {
  //TODO if you change the route - empty the search
  const [input, setInput] = useState("");
  const searchRef = useRef(null);

  const searchParam = `${rawgSubUrls.game}?search=${input}&page_size=4`;

  const { getRawgData } = RawgApiService;
  const gameSearchMutation = useMutation<GamesResultsType>({
    mutationKey: [`gameSearch=${input}`],
    mutationFn: () => getRawgData(searchParam),
  });

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (input.length > 0) {
        gameSearchMutation.mutate();
      }
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [input]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO handle input whitespace
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    // TODO redirect and
    console.log("fired");
  };

  return (
    <InputGroup>
      <Form.Control
        ref={searchRef}
        type="input"
        onSubmit={handleSubmit}
        value={input}
        onChange={handleChange}
      />
      <span>
        <SearchIcon size="15" />
      </span>

      <SearchSuggestionList
        data={input.length > 0 ? gameSearchMutation.data : undefined}
        loading={gameSearchMutation.isLoading}
      />
    </InputGroup>
  );
}

export default NavSearch;
