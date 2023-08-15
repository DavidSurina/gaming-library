import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { currentYear } from "../../globals/rawgParams";
import "./style.scss";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import { YearsInputRefType } from "../FilterMenu/FilterMenu";

const initialFromVal = 1950;
const initialToVal = currentYear;

type PropTypes = {
  yearsRef: YearsInputRefType;
};
function YearsInput(props: PropTypes) {
  const { yearsRef } = props;
  const { filteringParams, setFilteringParams } = useFilterContext();

  const [from, setFrom] = useState(initialFromVal);
  const [to, setTo] = useState(initialToVal);

  useEffect(() => {
    if (
      (yearsRef?.current && yearsRef.current.to !== initialToVal) ||
      (yearsRef?.current?.from && yearsRef.current.from !== initialFromVal)
    ) {
      setFrom(yearsRef?.current?.from as number);
      setTo(yearsRef?.current?.to as number);
    }
  }, []);

  useEffect(() => {
    const isFromValid =
      from >= initialFromVal && from < initialToVal && from < to;
    const isToValid = to <= initialToVal && to > from && to > initialFromVal;
    const fromVal = isFromValid ? from : initialFromVal;
    const toVal = isToValid ? to : initialToVal;
    const paramString = `${fromVal},${toVal}`;

    if (from !== initialFromVal || to !== initialToVal) {
      yearsRef.current = {
        from: from,
        to: to,
      };
    }

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
