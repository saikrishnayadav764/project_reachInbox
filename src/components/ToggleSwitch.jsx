import React, { useState } from 'react';
import '../styles/ToggleSwitch.css'; 

const ToggleSwitch = ({
    width = 60,
    height = 30,
    knobSize = 20,
    onColor = '#ffd700',
    offColor = '#ccc',
    knobColor = '#fff',
  }) => {
    const [isToggled, setIsToggled] = useState(false);
  
    const handleToggle = () => {
      setIsToggled(!isToggled);
    };
  
    return (
      <div
        className={`toggle-switch ${isToggled ? 'toggled' : ''}`}
        onClick={handleToggle}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border:"#343A40",
          borderRadius: `${height}px`,
          backgroundColor: isToggled ? onColor : offColor,
          padding: `${(height - knobSize) / 2}px`,
        }}
      >
        <div
          className="toggle-knob"
          style={{
            width: `${knobSize}px`,
            height: `${knobSize}px`,
            borderRadius: '50%',
            backgroundColor: knobColor,
            transform: isToggled
              ? `translateX(${width - knobSize-5}px)`
              : 'translateX(0)',
            transition: 'transform 0.3s',
          }}
        ></div>
      </div>
    );
  };
  
  export default ToggleSwitch;
