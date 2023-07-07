import React from "react";
import { Platforms } from "../../globals/types/rawgTypes";
import {
  PcDisplay,
  NintendoSwitch,
  Playstation,
  Xbox,
} from "react-bootstrap-icons";
import IconWrapper from "./IconWrapper";

type PropTypes = {
  platforms: Platforms[];
};

function PlatformIconRow(props: PropTypes) {
  const { platforms } = props;
  const platformList = ["pc", "playstation", "xbox", "nintendo-switch"];
  const size = 25;
  let icons = platformList.map((p) => {
    const getPlatform = platforms.find((pl) => pl.platform.slug.includes(p));

    if (getPlatform) {
      switch (p) {
        case "pc":
          return (
            <IconWrapper
              key={`pcDisplayIcon${name}`}
              icon={<PcDisplay className="mx-1" size={size} color="white" />}
              bgColor="black"
            />
          );
        case "playstation":
          return (
            <IconWrapper
              key={`playstationIcon${name}`}
              icon={<Playstation className="mx-1" size={size} color="white" />}
              bgColor="blue"
            />
          );
        case "xbox":
          return (
            <IconWrapper
              key={`xbox${name}`}
              icon={<Xbox size={size} color="green" />}
              bgColor="white"
            />
          );
        case "nintendo-switch":
          return (
            <IconWrapper
              key={`nintendoSwitchIcon${name}`}
              icon={<NintendoSwitch size={size} color="red" />}
              bgColor="white"
            />
          );
        default:
          return undefined;
      }
    }
    return undefined;
  });

  if (icons.length) {
    return (
      <div className="d-flex flex-row flex-grow-1 justify-content-end">
        {icons}
      </div>
    );
  }

  return <div />;
}

export default PlatformIconRow;
