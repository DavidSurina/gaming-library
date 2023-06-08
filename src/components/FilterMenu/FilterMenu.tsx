import React, { Dispatch, SetStateAction } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

interface PropTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function FilterMenu(props: PropTypes) {
  const { open, setOpen } = props;

  return (
    <Offcanvas in={open} placement="end">
      <Offcanvas.Header>
        <Offcanvas.Title>Filtering</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{/* Filters*/}s</Offcanvas.Body>
    </Offcanvas>
  );
}

export default FilterMenu;
