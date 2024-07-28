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
        <Card.Header>
          <div className="card-header_title-wrapper">
            <MetaCriticBadge metaCriticRating={metacritic} />
            <PlatformIconRow platforms={platforms} />
          </div>
          <Card.Title>{name}</Card.Title>
        </Card.Header>
      </Card>
    </Link>
  );
}

export default GameTile;
