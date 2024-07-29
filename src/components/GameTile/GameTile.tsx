import React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "react-bootstrap";
import PlatformIconRow from "../PlatformIconRow/PlatformIconRow";
import { LIBRARY_ROUTE } from "../../MainRoute";
import MetaCriticBadge from "../MetaCriticBadge/MetaCriticBadge";
import { Game } from "globals/types/rawgTypes";
import "./style.scss";

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
        <div className="rating-container">
          <MetaCriticBadge metaCriticRating={metacritic} />
        </div>
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          <PlatformIconRow platforms={platforms} />
        </Card.Header>
      </Card>
    </Link>
  );
}

export default GameTile;
