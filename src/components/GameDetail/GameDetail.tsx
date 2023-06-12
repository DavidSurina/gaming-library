import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Button } from "react-bootstrap";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRawgData } = RawgApiService;
  const param = `${rawgSubUrls.game}/${id}`;
  console.log(id);
  // TODO different type result on getGame query - create 2 fn getSingle/getMultiple ?
  const { data, isLoading, error, isInitialLoading } = useQuery({
    queryKey: [`game-${id}`],
    queryFn: () => getRawgData(param, {}),
  });

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }
  console.log(data);

  return (
    <section style={{ width: "100%" }}>
      <Button type="button" onClick={() => navigate(-1)} style={{}}>
        Back
      </Button>
      <div style={{ width: "100%", overflow: "hidden", maxHeight: "60vh" }}>
        <img
          src={data?.background_image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </section>
  );
}

export default GameDetail;
