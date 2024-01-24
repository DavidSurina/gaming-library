import React from "react";
import { Game } from "../../globals/types/rawgTypes";
import { Badge } from "react-bootstrap";

type PropTypes = {
  data: Game | undefined;
};

function DetailsTab(props: PropTypes) {
  const { data } = props;
  const rating = data?.rating || 0;
  const ratingTop = data?.rating_top || 0;
  const ratingsCount = data?.ratings_count || 0;
  const ratings = data?.ratings || [];
  const locale = window.navigator.language;
  const dateConvert =
    typeof data?.released === "string"
      ? Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeStyle: undefined,
        }).format(new Date(data?.released))
      : "-";
  const metacritic = data?.metacritic ? `${data.metacritic}%` : "-";

  return (
    <section>
      <div className="game-detail_tab-row">
        <div className="game-detail_rating-summary">
          <div>
            <span className="game-detail_main-rating">
              {rating} <span>of</span> {ratingTop}
            </span>
            <span>{ratingsCount} total reviews</span>
          </div>
          <div>
            {ratings && ratings.length ? (
              ratings.map((rating) => {
                return (
                  <div className="game-detail_rating-row" key="">
                    <span>&quot; {rating.title} &quot;</span>
                    <span className="game-detail_gauge">
                      <span style={{ width: `${rating.percent}%` }} />
                    </span>
                    <span>{rating.percent} %</span>
                  </div>
                );
              })
            ) : (
              <span>No Data</span>
            )}
          </div>
        </div>
        <div className="game-detail_details-summary">
          <div className="game-detail_tab-column">
            <span className="game-detail_tab-subheading">
              Metacritic rating
            </span>
            <span className="game-detail_tab-text">{metacritic}</span>
          </div>
          <div className="game-detail_tab-column">
            <span className="game-detail_tab-subheading">Release date</span>
            <span className="game-detail_tab-text">{dateConvert}</span>
          </div>
          <div className="game-detail_tab-column">
            <span className="game-detail_tab-subheading">Developed by</span>
            <span className="game-detail_tab-text">
              {data?.developers[0].name}
            </span>
          </div>
          <div className="game-detail_tab-column">
            <span className="game-detail_tab-subheading">Published by</span>
            <span className="game-detail_tab-text">
              {data?.publishers[0].name}
            </span>
          </div>
          <div className="game-detail_tab-row">
            <span className="game-detail_tab-subheading">Genres</span>
            <div className="game-detail_badge_wrapper">
              {data?.genres.map((p) => (
                <Badge bg="secondary" key={`${p.name}Badge`}>
                  {p.name}
                </Badge>
              )) || <div />}
            </div>
          </div>
          <div className="game-detail_tab-row">
            <span className="game-detail_tab-subheading">Playable on</span>
            <div className="game-detail_badge_wrapper">
              {data?.platforms.map((p) => (
                <Badge bg="secondary" key={`${p.platform.name}Badge`}>
                  {p.platform.name}
                </Badge>
              )) || <div />}
            </div>
          </div>
        </div>
      </div>
      <div className="game-detail_tab-row">
        <span className="game-detail_tab-subheading">Tags</span>
        <div className="game-detail_badge_wrapper">
          {data?.tags?.map((t) => (
            <Badge bg="secondary" key={`${t.name}Badge`}>
              {t.name}
            </Badge>
          )) || <div />}
        </div>
      </div>
      <div className="game-detail_tab-cell">
        <span className="game-detail_tab-subheading">Description</span>
        <span className="game-detail_tab-text fst-italic">{`" ${data?.description_raw} "`}</span>
      </div>
    </section>
  );
}

export default DetailsTab;
