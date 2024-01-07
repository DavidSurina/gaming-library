import React from "react";
import { Game } from "../../globals/types/rawgTypes";

type PropTypes = {
  data: Game | undefined;
};

function DetailsTab(props: PropTypes) {
  const { data } = props;
  const locale = window.navigator.language;
  const dateConvert =
    typeof data?.released === "string"
      ? Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeStyle: undefined,
        }).format(new Date(data?.released))
      : "-";

  return (
    <section>
      <div className="game-detail_tab-row">
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
        <div className="game-detail_tab-column">
          <span className="game-detail_tab-subheading">Release date</span>
          <span className="game-detail_tab-text">{dateConvert}</span>
        </div>
      </div>

      <div className="game-detail_tab-cell">
        <div className="game-detail_tab-column">
          <div className="game-detail_tab-cell">
            <span className="game-detail_tab-subheading">Playable on</span>
            <></>
          </div>
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
