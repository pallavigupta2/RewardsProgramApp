import React from "react";
import PropTypes from "prop-types";

const LoadingIndicator = ({ message }) => {
  return (
    <div className="loading-container">
      <span className="loading">{message}</span>
    </div>
  );
};
LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired,
};
export default LoadingIndicator;
