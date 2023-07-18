import React from "react";

type PropTypes = {
  icon: JSX.Element;
  bgColor?: string;
};

IconWrapper.defaultProps = {
  bgColor: "#3e8df7",
};
function IconWrapper(props: PropTypes) {
  const { icon, bgColor } = props;
  return (
    <span
      className="mx-1 p-1 rounded-circle"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {icon}
    </span>
  );
}

export default IconWrapper;
