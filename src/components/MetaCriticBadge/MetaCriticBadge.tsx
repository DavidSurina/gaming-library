import React from "react";
import "./style.scss";

type PropTypes = {
  metaCriticRating: number;
};

function MetaCriticBadge(props: PropTypes) {
  const { metaCriticRating } = props;

  return (
    <div className="metacritic-badge_wrapper">
      {metaCriticRating ? metaCriticRating + "%" : "---"}
    </div>
  );
}

export default MetaCriticBadge;
