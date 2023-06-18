import React from "react";

type PropTypes = {
  icon: JSX.Element;
  bgColor: string;
};
function IconWrapper(props: PropTypes) {
  const { icon, bgColor } = props;
  return (
    <div
      className="mx-1"
      style={{
        backgroundColor: bgColor,
        borderRadius: "50%",
        padding: "4px",
      }}
    >
      {icon}
    </div>
  );
}

export default IconWrapper;
