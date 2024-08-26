import React from 'react';

const colors = {
  critical: '#d72d2a', 
  info: '#007cbb', 
  positive: '#008060', 
  neutral: '#6c6e6f', 
};

const modalStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
};

const buttonGroupStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
};

const buttonStyles = {
  marginLeft: '10px',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  position: 'relative',
};

const spinnerStyles = {
  border: '2px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  borderTop: '2px solid white',
  width: '16px',
  height: '16px',
  animation: 'spin 1s linear infinite',
  display: 'inline-block',
  verticalAlign: 'middle',
};

const spinKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Modal = ({ isOpen, onClose, title, content, primaryAction, secondaryAction, primaryColor, secondaryColor, loading }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles} onClick={onClose}>
      <style>{spinKeyframes}</style>
      <div
        style={modalContentStyles}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 style={{ color: "black" }}>{title}</h2>
        <div style={{ color: "black" }}>{content}</div>
        <div style={buttonGroupStyles}>
          {secondaryAction && (
            <button
              style={{
                ...buttonStyles,
                backgroundColor: secondaryColor,
                color: 'black',
              }}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              style={{
                ...buttonStyles,
                backgroundColor: primaryColor, 
                color: 'white',
                pointerEvents: loading ? 'none' : 'auto',
              }}
              onClick={primaryAction.onClick}
              disabled={loading}
            >
              {loading ? (
                <div style={spinnerStyles} />
              ) : (
                primaryAction.label
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
