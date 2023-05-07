import React from "react";
import "./style.scss";

function LoadingSpinner() {
  return (
    <div className="wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
