import React from "react";
import { Link } from "react-router-dom";
import { Image, Card, Stack } from "react-bootstrap";

import { Game } from "globals/types/rawgTypes";
import "./style.scss";
import PlatformIconRow from "../PlatformIconRow/PlatformIconRow";
import { LIBRARY_ROUTE } from "../../MainRoute";
import MetaCriticBadge from "../MetaCriticBadge/MetaCriticBadge";

type PropTypes = {
  game: Game;
};

function GameTile(props: PropTypes) {
  const {
    game: { name, background_image, platforms, slug, metacritic },
  } = props;

  return (
    <Link to={`${LIBRARY_ROUTE}/${slug}`}>
      <Card>
        <div className="img-container">
          <Image src={background_image} alt="game-img" />
        </div>
        <Card.Header>
          <div className="card-header_title-wrapper">
            <Card.Title>{name}</Card.Title>
            <MetaCriticBadge metaCriticRating={metacritic} />
          </div>
          <PlatformIconRow platforms={platforms} />
        </Card.Header>
      </Card>
    </Link>
  );
}

export default GameTile;
