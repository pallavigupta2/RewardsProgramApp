import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <span className="error-icon">⚠️</span>
      <span className="error-message">{message}</span>
    </div>
  );
};
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Error;
