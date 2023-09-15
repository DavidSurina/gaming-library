import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { currentYear } from "../../globals/types/rawgParams";
import "./style.scss";
import { useFilterContext } from "../../globals/contexts/FilterContext";

const initialFromVal = 1985;
const initialToVal = currentYear;

function formatAndValidateYearsInput(
  from: number,
  to: number,
  field: "from" | "to"
) {
  const fromObj = {
    queryKey: "filter-dates-from",
    params: `${from}`,
  };

  const toObj = {
    queryKey: "filter-dates-to",
    params: `${to}`,
  };

  if (
    from < initialFromVal ||
    from > initialToVal ||
    to > initialToVal ||
    to < initialFromVal ||
    from > to
  ) {
    if (from >= initialFromVal && from > to && from <= initialToVal) {
      if (field === "from") {
        toObj.params = `${from}`;
      } else {
        fromObj.params = `${to}`;
      }
    }
    if (from < initialFromVal) {
      fromObj.params = `${initialFromVal}`;
    } else if (from > initialToVal) {
      fromObj.params = `${initialToVal}`;
    }
    if (to < initialFromVal) {
      toObj.params = `${initialFromVal}`;
    } else if (to > initialToVal) {
      toObj.params = `${initialToVal}`;
    }
  }

  return [fromObj, toObj];
}

function YearsInput() {
  const { filteringParams, setFilteringParams } = useFilterContext();

  const handleChange = (val: number, field: "from" | "to") => {
    const fromVal =
      field === "from" ? val : parseInt(filteringParams.dates[0].params);
    const toVal =
      field === "to" ? val : parseInt(filteringParams.dates[1].params);
    const newDatesObj = formatAndValidateYearsInput(fromVal, toVal, field);

    setFilteringParams((prev) => ({
      ...prev,
      dates: newDatesObj,
    }));
  };

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
          value={parseInt(filteringParams.dates[0].params)}
          onInput={(e) => handleChange(parseInt(e.currentTarget.value), "from")}
        />
      </FloatingLabel>
      <FloatingLabel className="years-label" controlId="toYearInput" label="To">
        <Form.Control
          style={{ zIndex: "auto" }}
          className="years-input"
          type="number"
          placeholder="years input"
          value={parseInt(filteringParams.dates[1].params)}
          onInput={(e) => handleChange(parseInt(e.currentTarget.value), "to")}
        />
      </FloatingLabel>
    </div>
  );
}

export default YearsInput;
