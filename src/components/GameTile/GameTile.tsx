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
    game: { name, id, background_image },
  } = props;

  return (
    <div className="tile-wrapper">
      <div className="tile-left">
        <img className="tile-image" src={background_image} alt="game-image" />
      </div>
      <div className="tile-right">
        <h3>{name}</h3>
        <Link to={`${DETAIL_ROUTE}/${id}`} className="tile-link">
          Details
        </Link>
      </div>
    </div>
  );
}

export default GameTile;
