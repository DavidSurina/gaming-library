import React, { Dispatch, SetStateAction } from "react";
import ReactSlider from "react-slider";
import { FilteringParamsType } from "../FilterMenu/FilterMenu";
import "./style.scss";
import { CurrentQueryType } from "../../globals/contexts/LibraryContext";

type PropTypes = {
  state: FilteringParamsType;
  setState: Dispatch<SetStateAction<FilteringParamsType>>;
};
function FilterSlider(props: PropTypes) {
  const { state, setState } = props;
  console.log(state);
  function handleChange(value: number[]) {
    const param = [{ queryKey: "metacritic", params: value.join(",") }];
    setState({ ...state, metacritic: param });
  }

  return (
    <ReactSlider
      className="slider-wrapper"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      onChange={handleChange}
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
