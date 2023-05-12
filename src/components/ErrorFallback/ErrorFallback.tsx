import React from "react";
import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div>
      <span role="alert">Something went wrong: </span>
      <span>{error}</span>
    </div>
  );
}

export default ErrorFallback;
