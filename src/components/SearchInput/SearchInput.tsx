import React, { useState } from "react";
import { Button, Form, InputGroup, FloatingLabel } from "react-bootstrap";
import { useLibContext } from "globals/contexts/LibraryContext";

export const gameSearchQueryKey = "gameSearch";

function SearchInput() {
  const { setQueryParams } = useLibContext();
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log("fired");
    setQueryParams((prevState) => ({
      ...prevState,
      queryKey: "gameSearch",
      params: `search=${input}&ordering=-metacritic`,
    }));
  };

  return (
    <InputGroup className="p-3" style={{ flexGrow: 1 }}>
      <FloatingLabel controlId="floatingInput" label="Find games">
        <Form.Control
          type="input"
          placeholder="abcde"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
      </FloatingLabel>
      <Button type="button" variant="outline-secondary" onClick={handleClick}>
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchInput;
