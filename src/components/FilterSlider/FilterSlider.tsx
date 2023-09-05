import React from "react";
import ReactSlider from "react-slider";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import "./style.scss";

function FilterSlider() {
  const { filteringParams, setFilteringParams } = useFilterContext();
  function handleChange(value: number[]) {
    const param = [{ queryKey: "metacritic", params: value.join(",") }];
    setFilteringParams({ ...filteringParams, metacritic: param });
  }

  return (
    <ReactSlider
      className="slider-wrapper"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      onAfterChange={handleChange}
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
