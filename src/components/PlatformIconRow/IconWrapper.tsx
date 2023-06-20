import React from "react";

type PropTypes = {
  icon: JSX.Element;
  bgColor: string;
};
function IconWrapper(props: PropTypes) {
  const { icon, bgColor } = props;
  return (
    <span
      className="mx-1"
      style={{
        backgroundColor: bgColor,
        borderRadius: "50%",
        padding: "4px",
      }}
    >
      {icon}
    </span>
  );
}

export default IconWrapper;
