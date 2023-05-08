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
      <div className="tile-top">
        <img className="tile-image" src={background_image} alt="game-img" />
      </div>
      <Link to={`${DETAIL_ROUTE}/${id}`} className="tile-link">
        Details
      </Link>
      <div className="tile-bottom">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default GameTile;
