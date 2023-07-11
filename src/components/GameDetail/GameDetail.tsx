import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Button } from "react-bootstrap";
import { Game } from "../../globals/types/rawgTypes";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRawgData } = RawgApiService;
  const param = `${rawgSubUrls.game}/${id}`;

  const { data, isInitialLoading } = useQuery<Game>({
    queryKey: [`game-${id}`],
    queryFn: () => getRawgData<Game>(param, {}),
  });

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section style={{ width: "100%" }}>
      <Button type="button" onClick={() => navigate(-1)} style={{}}>
        Back
      </Button>
      <div style={{ width: "100%", overflow: "hidden", maxHeight: "60vh" }}>
        <img
          alt="game-img"
          src={data?.background_image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div>{`Publisher - ${data?.publishers[0].name}`}</div>
      <div>{`Platforms - ${data?.platforms
        .map((pl) => pl?.platform.name)
        .join(", ")}`}</div>
      <div>{`Genres - ${data?.genres.map((g) => g.name).join(", ")}`}</div>
    </section>
  );
}

export default GameDetail;
