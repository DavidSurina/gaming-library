import React, { useState, forwardRef, ForwardedRef } from "react";
import "./style.scss";
import { InputGroup, Form } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";

const NavSearch = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.length === 0) return;
    // TODO redirect and
  };

  return (
    <InputGroup ref={ref}>
      <Form.Control
        type="input"
        className="form-control"
        onSubmit={handleSubmit}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <span>
        <SearchIcon size="15" />
      </span>
    </InputGroup>
  );
});

export default NavSearch;
