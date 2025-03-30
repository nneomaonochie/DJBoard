import React from 'react';

const EQSlider = ({ label, min, max, step, onChange }) => {
  return (
    <div className="eq-slider">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
};

export default EQSlider;