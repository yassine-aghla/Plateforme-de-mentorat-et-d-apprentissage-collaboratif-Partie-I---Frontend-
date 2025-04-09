import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message || 'An error occurred'}</p>
  </div>
);

export default ErrorMessage;