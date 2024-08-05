import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/rawgApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Game, GameScreenshotResultsType } from "../../globals/types/rawgTypes";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import DetailsSection from "./DetailsSection";
import "./style.scss";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRawgData } = RawgApiService;
  const gameParam = `${rawgSubUrls.game}/${id}`;
  const screenShotParam = `${rawgSubUrls.game}/${id}/screenshots`;

  const { data, isInitialLoading } = useQuery<Game>({
    queryKey: [`game-${id}`],
    queryFn: () => getRawgData<Game>(gameParam, {}),
  });

  const { data: screenshotsData, isInitialLoading: screenshotsInitialLoading } =
    useQuery({
      queryKey: [`${id}screenshots`],
      queryFn: () =>
        getRawgData<GameScreenshotResultsType>(screenShotParam, {}),
    });

  if (isInitialLoading || screenshotsInitialLoading) {
    return <LoadingSpinner />;
  }
  console.log(data);
  return (
    <div
      className="game-detail_wrapper"
      style={{
        backgroundImage: `url(${data?.background_image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="game-detail_top-section">
        <div className="game-detail_top-content">
          <Button
            type="button"
            className="game-detail_back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={25} />
            <span>Back</span>
          </Button>

          <div className="game-detail_main-heading">
            <h1>{data?.name || "-"}</h1>
            <div>
              <h5>
                {data?.publishers && data.publishers.length ? (
                  <>{data.publishers[0].name}&#183; </>
                ) : (
                  ""
                )}{" "}
                {data?.genres && data?.genres.length
                  ? data?.genres.map((p) => p.name.toLowerCase()).join(" / ")
                  : ""}
              </h5>
            </div>
          </div>

          {screenshotsData && <ImageCarousel images={screenshotsData} />}
        </div>
      </section>
      <DetailsSection data={data} />
    </div>
  );
}

export default GameDetail;
