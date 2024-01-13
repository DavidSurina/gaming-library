import React from "react";
import { Game } from "../../globals/types/rawgTypes";

type PropTypes = {
  data: Game | undefined;
};

function MoreTab(props: PropTypes) {
  const { data } = props;
  return <section>More Tab</section>;
}

export default MoreTab;
