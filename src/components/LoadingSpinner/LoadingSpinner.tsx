import React from "react";
import { Spinner, Container } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <Container fluid className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="secondary"
        style={{ width: 60, height: 60 }}
      />
    </Container>
  );
}

export default LoadingSpinner;
