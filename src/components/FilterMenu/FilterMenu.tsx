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
import { currentQueryConvert } from "../../globals/functions/helpers";
import Multiselect from "../Multiselect/Multiselect";
import FilterSlider from "../FilterSlider/FilterSlider";
import YearsInput from "../YearsInput/YearsInput";

export type FilteringParamsType = Record<string, CurrentQueryType[]>;

type PropTypes = {
  open: boolean;
  handleClose: () => void;
};
function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;
  const { setCurrentQuery } = useLibContext();
  const [filteringParams, setFilteringParams] = useState<FilteringParamsType>({
    genres: [],
    platform: [],
    publishers: [],
    metacritic: [],
    dates: [],
  });
  const thisYear = new Date().getFullYear();
  console.log(thisYear);
  const onSelectItem = (
    e: UseSelectStateChange<CurrentQueryType>,
    label: string
  ) => {
    const { selectedItem } = e;
    const arr = [...filteringParams[label]];
    if (
      !arr.length ||
      (selectedItem && arr[0].queryKey !== selectedItem.queryKey)
    ) {
      arr[0] = selectedItem as CurrentQueryType;
      setFilteringParams((prevState) => ({ ...prevState, [`${label}`]: arr }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentQuery({
      queryKey: "filter",
      params: formatParams(filteringParams),
    });
  };

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
            <Multiselect
              labelId="genres"
              selectedItems={filteringParams}
              setSelectedItems={setFilteringParams}
              items={currentQueryConvert(genres)}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="platforms" className="pb-2">
              Platforms:
            </label>
            <Multiselect
              labelId="platform"
              selectedItems={filteringParams}
              setSelectedItems={setFilteringParams}
              items={currentQueryConvert(platform)}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="publishers" className="pb-2">
              Publishers:
            </label>
            <Select
              labelId="publishers"
              selectedItem={filteringParams.publishers[0]}
              items={currentQueryConvert(publishers)}
              onSelectedItemChange={(e) => onSelectItem(e, "publishers")}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <div className="pb-2">Critic rating:</div>
            {/*Select with multiple or input from user between 0-100*/}
            <FilterSlider
              state={filteringParams}
              setState={setFilteringParams}
            />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <div className="pb-2">Release year between:</div>
            {/*Date range input*/}
            <YearsInput
              filteringParams={filteringParams}
              setFilteringParams={setFilteringParams}
            />
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
