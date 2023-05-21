import React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "react-bootstrap";

import { DETAIL_ROUTE } from "MainRoute";
import { Game } from "globals/types/rawgTypes";
import "./style.scss";

type PropTypes = {
  game: Game;
};

function GameTile(props: PropTypes) {
  const {
    game: { name, id, background_image },
  } = props;

  return (
    <Card>
      <div className="img-container">
        <Card.Img variant="top" src={background_image} alt="game-img" />
      </div>
      <Card.Body>
        <Card.Link
          as={Link}
          to={`${DETAIL_ROUTE}/${id}`}
          className="text-right"
        >
          Details
        </Card.Link>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default GameTile;
