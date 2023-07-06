import React, { FormEvent, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  CurrentQueryType,
  useLibContext,
} from "../../globals/contexts/LibraryContext";
import Select from "../Select/Select";
import { genres, platform, publishers } from "../../globals/rawgParams";
import { UseSelectStateChange } from "downshift";
import { Button, Form } from "react-bootstrap";
import { formatParams } from "../../globals/functions/api";

interface PropTypes {
  open: boolean;
  handleClose: () => void;
}
function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;
  const { setCurrentQuery } = useLibContext();
  const [filteringParams, setFilteringParams] = useState<
    Record<string, [string, string][]>
  >({
    genres: [],
    platform: [],
    publishers: [],
  });

  const onSelectItem = (
    e: UseSelectStateChange<CurrentQueryType>,
    label: string
  ) => {
    const { selectedItem } = e;
    const arr = [...filteringParams[`${label}`]];
    if (!arr.length || (selectedItem && arr[0][1] !== selectedItem[1])) {
      arr[0] = selectedItem as CurrentQueryType;
      setFilteringParams((prevState) => ({ ...prevState, [`${label}`]: arr }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filteringParams);
    setCurrentQuery(["filter", formatParams(filteringParams)]);
  };

  // TODO change this to form
  return (
    <Offcanvas
      show={open}
      onHide={handleClose}
      placement="end"
      backdrop={true}
      className="bg-primary"
    >
      <Form onSubmit={handleSubmit}>
        <Offcanvas.Header>
          <Offcanvas.Title>Filtering</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="genres" className="pb-2">
              Genre:
            </label>
            <Select
              labelId="genres"
              selectedItem={filteringParams.genres[0]}
              items={Object.entries(genres)}
              onSelectedItemChange={(e) => onSelectItem(e, "genres")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="platforms" className="pb-2">
              Platforms:
            </label>
            <Select
              labelId="platforms"
              selectedItem={filteringParams.platform[0]}
              items={Object.entries(platform)}
              onSelectedItemChange={(e) => onSelectItem(e, "platform")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="publishers" className="pb-2">
              Publishers:
            </label>
            <Select
              labelId="publishers"
              selectedItem={filteringParams.publishers[0]}
              items={Object.entries(publishers)}
              onSelectedItemChange={(e) => onSelectItem(e, "publishers")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <div className="pb-2">Critic rating:</div>
            {/*Select with multiple or input from user between 0-100*/}
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <div className="pb-2">Released:</div>
            {/*Date range input*/}
          </div>
        </Offcanvas.Body>
        <Button type="submit" className="p-3">
          Confirm
        </Button>
      </Form>
    </Offcanvas>
  );
}

export default FilterMenu;
