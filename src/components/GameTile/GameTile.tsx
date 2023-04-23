import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { DETAIL_ROUTE } from "MainRoute";
import { Game } from "globals/types/rawgTypes";

type PropTypes = {
  game: Game;
};

function GameTile(props: PropTypes) {
  const {
    game: { name, id },
  } = props;

  return (
    <div className="tile-wrapper">
      <h2>{name}</h2>
      <Link to={`${DETAIL_ROUTE}/${id}`} className="tile-link">
        Details
      </Link>
    </div>
  );
}

export default GameTile;
