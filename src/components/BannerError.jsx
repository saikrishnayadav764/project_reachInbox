import React from 'react';

const ErrorBanner = ({ message, onClose }) => {
  const bannerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f44336', 
    color: 'white',
    padding: '12px 16px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const iconStyle = {
    marginRight: '8px',
    fontSize: '20px',
  };

  const messageStyle = {
    flexGrow: 1,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
  };

  const closeButtonHoverStyle = {
    color: '#ffcccb',
  };

  return (
    <div style={bannerStyle} role="alert">
      <div style={iconStyle}>
        <span role="img" aria-label="error">⚠️</span>
      </div>
      <div style={messageStyle}>
        {message}
      </div>
      {onClose && (
        <button
          style={closeButtonStyle}
          onMouseOver={(e) => e.target.style.color = closeButtonHoverStyle.color}
          onMouseOut={(e) => e.target.style.color = closeButtonStyle.color}
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};


export default ErrorBanner;
