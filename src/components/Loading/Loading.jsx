import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden"></span>
      </Spinner>
      <div>Đang tải dữ liệu ...</div>
    </div>
  );
};

export default LoadingSpinner;
