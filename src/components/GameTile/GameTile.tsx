import React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "react-bootstrap";

import { DETAIL_ROUTE } from "MainRoute";
import { Game } from "globals/types/rawgTypes";
import "./style.scss";
import PlatformIconRow from "../PlatformIconRow/PlatformIconRow";
import clsx from "clsx";

type PropTypes = {
  game: Game;
};

function GameTile(props: PropTypes) {
  const {
    game: { name, background_image, platforms, released, metacritic, slug },
  } = props;
  let formattedName = name.split(":");

  return (
    <Link to={`${DETAIL_ROUTE}/${slug}`}>
      <Card>
        <div className="img-container">
          <Image src={background_image} alt="game-img" />
        </div>
        <Card.Header>
          <Card.Title
            className={clsx({ "card-title-padding": !formattedName[1] })}
          >
            {formattedName[0]}
            {formattedName.length === 2 && ":"}
          </Card.Title>
          {formattedName[1] && (
            <Card.Subtitle className="my-1">{formattedName[1]}</Card.Subtitle>
          )}
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center py-1">
            <Card.Subtitle>Released:</Card.Subtitle>
            <Card.Text>{new Date(released).toLocaleDateString()}</Card.Text>
          </div>
          <div className="d-flex justify-content-between align-items-center py-1">
            <Card.Subtitle>Critic rating:</Card.Subtitle>
            <Card.Text>{metacritic}/100</Card.Text>
          </div>
          <div className="d-flex flex-row justify-content-between py-1">
            <Card.Subtitle>Platforms:</Card.Subtitle>
            <Card.Text as="div">
              <PlatformIconRow name={name} platforms={platforms} />
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default GameTile;
