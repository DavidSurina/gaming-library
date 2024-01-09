import React from "react";
import "./style.scss";
import { Game } from "../../globals/types/rawgTypes";

type PropTypes = {
  data: Game | undefined;
};

function ReviewsTab(props: PropTypes) {
  const { data } = props;
  const rating = data?.rating || 0;
  const ratingTop = data?.rating_top || 0;
  const ratingsCount = data?.ratings_count || 0;
  const ratings = data?.ratings;

  return (
    <section>
      <div className="game-detail_review-summary">
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
      <div className="game-detail_reviews"></div>
    </section>
  );
}

export default ReviewsTab;
