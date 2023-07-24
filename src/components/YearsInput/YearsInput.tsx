import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { currentYear } from "../../globals/rawgParams";
import "./style.scss";
import { FilteringParamsType } from "../FilterMenu/FilterMenu";

const initialFromVal = 1950;
const initialToVal = currentYear;

type PropTypes = {
  filteringParams: FilteringParamsType;
  setFilteringParams: Dispatch<SetStateAction<FilteringParamsType>>;
};

function YearsInput(props: PropTypes) {
  const { filteringParams, setFilteringParams } = props;
  const [from, setFrom] = useState(initialFromVal);
  const [to, setTo] = useState(initialToVal);

  useEffect(() => {
    const isFromValid =
      from >= initialFromVal && from < initialToVal && from < to;
    const isToValid = to <= initialToVal && to > from && to > initialFromVal;
    const paramString = `${isFromValid ? from : initialFromVal},${
      isToValid ? to : initialToVal
    }`;
    const datesObj = [
      {
        queryKey: "filter-dates",
        params: paramString,
      },
    ];

    setFilteringParams({
      ...filteringParams,
      dates: datesObj,
    });
  }, [from, to]);

  return (
    <div className="wrapper" style={{ zIndex: "auto" }}>
      <FloatingLabel
        className="years-label"
        controlId="fromYearInput"
        label="From"
      >
        <Form.Control
          style={{ zIndex: "auto" }}
          className="years-input"
          type="number"
          placeholder="years input"
          value={from}
          onInput={(e) => setFrom(+e.currentTarget.value)}
        />
      </FloatingLabel>
      <FloatingLabel className="years-label" controlId="toYearInput" label="To">
        <Form.Control
          style={{ zIndex: "auto" }}
          className="years-input"
          type="number"
          placeholder="years input"
          value={to}
          onInput={(e) => setTo(+e.currentTarget.value)}
        />
      </FloatingLabel>
    </div>
  );
}

export default YearsInput;
