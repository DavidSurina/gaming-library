import React, { useState } from "react";
import { Button, Form, InputGroup, FloatingLabel } from "react-bootstrap";

import { useLibContext } from "globals/contexts/LibraryContext";

function SearchInput() {
  const { setCurrentQuery } = useLibContext();
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log("fired");
    setCurrentQuery((prevState) => ({
      ...prevState,
      queryKey: `gameSearch=${input}`,
      params: `search=${input}`,
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
      <Button
        type="button"
        variant="outline-secondary"
        onClick={handleClick}
        disabled={input.length === 0}
      >
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchInput;
