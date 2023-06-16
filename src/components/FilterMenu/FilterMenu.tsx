import React, { FormEvent, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  CurrentQueryType,
  useLibContext,
} from "../../globals/contexts/LibraryContext";
import Select from "../Select/Select";
import { genres, platform, publishers } from "../../globals/rawgParams";
import { UseSelectStateChange } from "downshift";
import { Button } from "react-bootstrap";
import { formatParams } from "../../globals/functions/api";
import { getSelectData } from "../../globals/functions/helpers";

interface PropTypes {
  open: boolean;
  handleClose: () => void;
}
function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;
  const { setCurrentQuery } = useLibContext();
  const [filteringParams, setFilteringParams] = useState<
    Record<string, string[]>
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
    if (!arr.includes(selectedItem?.params as string)) {
      arr[0] = selectedItem?.params as string;
    }

    setFilteringParams((prevState) => ({ ...prevState, [`${label}`]: arr }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentQuery({
      queryKey: "filter",
      params: formatParams(filteringParams),
    });
  };

  // TODO change this to form
  return (
    <form onSubmit={handleSubmit}>
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
            <label id="genres" className="pb-2">
              Genre:
            </label>
            <Select
              labelId="genres"
              items={getSelectData(genres)}
              onSelectedItemChange={(e) => onSelectItem(e, "genres")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="platforms" className="pb-2">
              Platforms:
            </label>
            <Select
              labelId="platforms"
              items={getSelectData(platform)}
              onSelectedItemChange={(e) => onSelectItem(e, "platform")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="publishers" className="pb-2">
              Publishers:
            </label>
            <Select
              labelId="publishers"
              items={getSelectData(publishers)}
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
      </Offcanvas>
    </form>
  );
}

export default FilterMenu;
