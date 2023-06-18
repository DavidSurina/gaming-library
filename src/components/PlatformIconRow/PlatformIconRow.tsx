import React from "react";
import { Platforms } from "../../globals/types/rawgTypes";
import {
  PcDisplay,
  NintendoSwitch,
  Playstation,
  Xbox,
} from "react-bootstrap-icons";

function PlatformIconRow(props: { platforms: Platforms[] }) {
  const { platforms } = props;
  const platformList = ["pc", "playstation", "xbox", "nintendo-switch"];
  const size = 30;
  let icons = platformList.map((p) => {
    const getPlatform = platforms.find((pl) => pl.platform.slug.includes(p));

    if (getPlatform) {
      switch (p) {
        case "pc":
          return <PcDisplay className="mx-1" size={size} />;
        case "playstation":
          return <Playstation className="mx-2" size={size} />;
        case "xbox":
          return <Xbox className="mx-2" size={size} />;
        case "nintendo-switch":
          return <NintendoSwitch className="mx-2" size={size} />;
        default:
          return undefined;
      }
    }
  });

  if (icons.length) {
    return (
      <div className="d-flex flex-row flex-grow-1 justify-content-end">
        {icons.map((i) => i)}
      </div>
    );
  }

  return <div />;
}

export default PlatformIconRow;
