import React from "react";
import { useParams } from "react-router-dom";

function GameDetail() {
  const { id } = useParams();
  // TODO: add call to get the game data

  return (
    <section>
      <h1>{id} Game</h1>
    </section>
  );
}

export default GameDetail;
