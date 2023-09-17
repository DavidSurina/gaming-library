import React, { FormEvent, useState } from "react";
import { Button, Form, InputGroup, FloatingLabel } from "react-bootstrap";

import { useLibContext } from "globals/contexts/LibraryContext";

function SearchInput() {
  const { setCurrentQuery } = useLibContext();
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentQuery({
      queryKey: `gameSearch=${input}`,
      params: `search=${input}`,
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} style={{ flexGrow: 1 }}>
      <InputGroup className="p-3">
        <FloatingLabel controlId="floatingInput" label="Find games">
          <Form.Control
            type="input"
            placeholder="search"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </FloatingLabel>
        <Button type="submit" variant="secondary" disabled={input.length === 0}>
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchInput;
