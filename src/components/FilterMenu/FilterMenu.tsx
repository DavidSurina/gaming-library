import React, { Dispatch, SetStateAction } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import Select from "../Select/Select";
import { genres, platforms, publishers } from "../../globals/rawgParams";

interface PropTypes {
  open: boolean;
  handleClose: () => void;
}

function getSelectData(data: Record<string, string>): CurrentQueryType[] {
  return Object.entries(data).map(([key, value]) => {
    return {
      queryKey: key,
      params: value,
    };
  });
}

function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;

  return (
    <Offcanvas
      show={open}
      onHide={handleClose}
      placement="end"
      backdrop={true}
      className="bg-primary"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>Filtering</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-column justify-content-around py-3">
          <div className="pb-2">Genre:</div>
          <Select items={getSelectData(genres)} />
        </div>
        <div className="d-flex flex-column justify-content-around py-3">
          <div className="pb-2">Platforms:</div>
          <Select items={getSelectData(platforms)} />
        </div>
        <div className="d-flex flex-column justify-content-around py-3">
          <div className="pb-2">Publishers:</div>
          <Select items={getSelectData(publishers)} />
        </div>
        <div className="d-flex flex-column justify-content-around py-3">
          <div className="pb-2">Critic rating:</div>
          {/*Select with multiple*/}
        </div>
        <div className="d-flex flex-column justify-content-around py-3">
          <div className="pb-2">Released:</div>
          {/*Date range input*/}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default FilterMenu;
