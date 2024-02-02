import React from "react";
import { PlatformsType } from "../../globals/types/rawgTypes";
import {
  Windows as WindowsIcon,
  NintendoSwitch as NintendoSwitchIcon,
  Playstation as PlaystationIcon,
  Xbox as XboxIcon,
  Android as AndroidIcon,
  Apple as AppleIcon,
} from "react-bootstrap-icons";
import IconWrapper from "./IconWrapper";
import { iconSize, platformList } from "./constants";
import "./style.scss";

type PropTypes = {
  platforms: PlatformsType[];
};

function PlatformIconRow(props: PropTypes) {
  const { platforms } = props;
  console.log(platforms);
  if (!platforms) {
    return null;
  }

  const icons = platformList.map((p) => {
    const findPlatform = platforms.find((pl) => pl.platform.slug.includes(p));
    if (!findPlatform) {
      return undefined;
    }
    let icon: JSX.Element;

    if (findPlatform) {
      switch (p) {
        case "pc":
          icon = <WindowsIcon size={iconSize - 2} color="white" />;
          break;
        case "macos":
          icon = <AppleIcon size={iconSize} color="white" />;
          break;
        case "android":
          icon = <AndroidIcon size={iconSize} color="white" />;
          break;
        case "playstation":
          icon = <PlaystationIcon size={iconSize} color="white" />;
          break;
        case "xbox":
          icon = <XboxIcon size={iconSize} color="white" />;
          break;
        case "nintendo-switch":
          icon = <NintendoSwitchIcon size={iconSize} color="white" />;
          break;
        default:
          icon = <div />;
          break;
      }
    }
    return <IconWrapper key={p} icon={icon} />;
  });

  if (icons.length < platforms.length) {
    const calc = platforms.length - icons.length;
    const element = <span className="icon-row_extra-text">{"+" + calc}</span>;
    icons.push(<IconWrapper key={"other"} icon={element} />);
  }

  return <ul className="icon-row_wrapper">{icons}</ul>;
}

export default PlatformIconRow;
