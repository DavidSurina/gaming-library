import React from "react";
import "./style.scss";

type PropTypes = {
  name: string;
};

function GameTile(props: PropTypes) {
  const { name } = props;

  return (
    <div className="tile-wrapper">
      <h2>{name}</h2>
    </div>
  );
}

export default GameTile;
