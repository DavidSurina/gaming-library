import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/rawgApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Button, Tab, Tabs } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Game, GameScreenshotResultsType } from "../../globals/types/rawgTypes";
import "./style.scss";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import DetailsTab from "./DetailsTab";
import MoreTab from "./MoreTab";

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
      queryKey: [``],
      queryFn: () =>
        getRawgData<GameScreenshotResultsType>(screenShotParam, {}),
    });

  if (isInitialLoading || screenshotsInitialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section
      className="game-detail_wrapper"
      style={{
        backgroundImage: `url(${data?.background_image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="game-detail_top-section">
        <div className="game-detail_top-content">
          <Button
            type="button"
            className="game-detail_back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={25} />
            <span>Back</span>
          </Button>

          <h1 className="game-detail_main-heading">{data?.name}</h1>

          {screenshotsData && <ImageCarousel images={screenshotsData} />}
        </div>
      </div>

      <div className="game-detail_bottom-section">
        <Tabs
          defaultActiveKey="details"
          variant="underline"
          className="game-detail_tabs-wrapper"
        >
          <Tab
            eventKey="details"
            title="DETAILS"
            className="game-detail_tab-wrapper"
          >
            <DetailsTab data={data} />
          </Tab>

          <Tab eventKey="more" title="MORE" className="game-detail_tab-wrapper">
            <MoreTab data={data} />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default GameDetail;
