import React from "react";
import {PlatformsType} from "../../globals/types/rawgTypes";
import {
  PcDisplay as PcDisplayIcon,
  NintendoSwitch as NintendoSwitchIcon,
  Playstation as PlaystationIcon,
  Xbox as XboxIcon,
} from "react-bootstrap-icons";
import IconWrapper from "./IconWrapper";
import { iconSize, platformList } from "./constants";
import "./style.scss";

type PropTypes = {
  platforms: Platforms[];
};

type AttributeType = {
  icon: JSX.Element | null;
  bgColor: string;
};

function PlatformIconRow(props: PropTypes) {
  const { platforms } = props;

  if (!platforms) {
    return null;
  }

  const icons = platformList.map((p) => {
    const findPlatform = platforms.find((pl) => pl.platform.slug.includes(p));

    const attributes: AttributeType = {
      icon: null,
      bgColor: "",
    };

    if (!findPlatform) {
      return undefined;
    }

    if (findPlatform) {
      switch (p) {
        case "pc":
          attributes.icon = (
            <PcDisplayIcon className="mx-1" size={iconSize} color="white" />
          );
          attributes.bgColor = "black";
          break;
        case "playstation":
          attributes.icon = (
            <PlaystationIcon className="mx-1" size={iconSize} color="white" />
          );
          attributes.bgColor = "blue";
          break;
        case "xbox":
          attributes.icon = <XboxIcon size={iconSize} color="green" />;
          attributes.bgColor = "white";
          break;
        case "nintendo-switch":
          attributes.icon = <NintendoSwitchIcon size={iconSize} color="red" />;
          attributes.bgColor = "white";
          break;
        default:
          return undefined;
      }
    }
    return (
      <IconWrapper
        key={p}
        icon={attributes.icon as JSX.Element}
        bgColor={attributes.bgColor}
      />
    );
  });

  if (icons.length < platforms.length) {
    const calc = platforms.length - icons.length;
    const element = <span className="icon-text">{"+" + calc}</span>;
    icons.push(<IconWrapper key={"other"} icon={element} />);
  }

  return (
    <ul className="d-flex flex-row flex-grow-1 justify-content-end">{icons}</ul>
  );
}

export default PlatformIconRow;
