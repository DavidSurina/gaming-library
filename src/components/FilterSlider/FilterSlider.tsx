import React, { Dispatch, SetStateAction } from "react";
import ReactSlider from "react-slider";
import { FilteringParamsType } from "../FilterMenu/FilterMenu";
import "./style.scss";

type PropTypes = {
  state: FilteringParamsType;
  setState: Dispatch<SetStateAction<FilteringParamsType>>;
};
function FilterSlider(props: PropTypes) {
  const { state, setState } = props;

  return (
    <ReactSlider
      className="slider-wrapper"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      onChange={(value, index) => console.log(value, index)}
      min={0}
      max={100}
      defaultValue={[0, 100]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
    />
  );
}

export default FilterSlider;
