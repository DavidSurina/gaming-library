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
      value={[0, 100]}
      className="slider-wrapper"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      min={0}
      max={100}
      ariaLabel={["Lower thumb", "Upper thumb"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
    />
  );
}

export default FilterSlider;
