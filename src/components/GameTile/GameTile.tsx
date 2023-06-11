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
    game: { name, id, background_image, platforms, released, metacritic },
  } = props;

  return (
    <Link to={`${DETAIL_ROUTE}/${id}`}>
      <Card>
        <div className="img-container">
          <Image src={background_image} alt="game-img" />
        </div>
        <Card.Title>{name}</Card.Title>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center py-1">
            <Card.Subtitle>Released:</Card.Subtitle>
            <Card.Text>{new Date(released).toLocaleDateString()}</Card.Text>
          </div>
          <div className="d-flex justify-content-between align-items-center py-1">
            <Card.Subtitle>Critic rating:</Card.Subtitle>
            <Card.Text>{metacritic}/100</Card.Text>
          </div>
          <div className="d-flex flex-column justify-content-between py-1">
            <Card.Subtitle>Platforms:</Card.Subtitle>
            <Card.Text>
              {platforms.map((p, index) => p.platform.name).join(", ")}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default GameTile;
