import React, { FormEvent, MutableRefObject, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  CurrentQueryType,
  useLibContext,
} from "../../globals/contexts/LibraryContext";
import Select from "../Select/Select";
import { genres, platform, publishers } from "../../globals/types/rawgParams";
import { UseSelectStateChange } from "downshift";
import { Button, Form } from "react-bootstrap";
import { formatParams } from "../../globals/functions/api";
import { currentQueryConvert } from "../../globals/functions/helpers";
import Multiselect from "../Multiselect/Multiselect";
import FilterSlider from "../FilterSlider/FilterSlider";
import YearsInput from "../YearsInput/YearsInput";
import {
  initialFilteringParams,
  useFilterContext,
} from "../../globals/contexts/FilterContext";
import FilterChipBox from "../FilterChipBox/FitlerChipBox";
import "./style.scss";

export type YearsInputRefType = MutableRefObject<{
  from: null | number;
  to: null | number;
}>;

type PropTypes = {
  open: boolean;
  handleClose: () => void;
};

function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;
  const { setCurrentQuery } = useLibContext();
  const { filteringParams, setFilteringParams } = useFilterContext();

  const yearsRef: YearsInputRefType = useRef({
    from: null,
    to: null,
  });

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

  // console.log(filteringParams.publishers[0]);

  const handleReset = () => {
    yearsRef.current = {
      from: null,
      to: null,
    };
    setFilteringParams(initialFilteringParams);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentQuery({
      queryKey: "filter",
      params: formatParams(filteringParams) + "&search_precise=true",
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
      <Form onSubmit={handleSubmit} className="filter-form">
        <Offcanvas.Header className="d-flex flex-column align-items-start">
          <Offcanvas.Title className="py-3">Filtering</Offcanvas.Title>
          <FilterChipBox />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="genres" className="pb-2">
              Genre:
            </label>
            <Multiselect labelId="genres" items={currentQueryConvert(genres)} />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <label id="platforms" className="pb-2">
              Platforms:
            </label>
            <Multiselect
              labelId="platform"
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
            <FilterSlider />
          </div>
          <div className="d-flex flex-column justify-content-around py-3">
            <div className="pb-2">Release year between:</div>
            {/*Date range input*/}
            <YearsInput yearsRef={yearsRef} />
          </div>
        </Offcanvas.Body>
        <div className="offcanvas_button-wrapper">
          <Button
            type="submit"
            variant="secondary"
            className="p-2 ms-1 flex-grow-1"
          >
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            className="p-2 flex-grow-2 me-1"
            onClick={handleReset}
          >
            Reset filters
          </Button>
        </div>
      </Form>
    </Offcanvas>
  );
}

export default FilterMenu;
