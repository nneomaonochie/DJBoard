// EQSliders.js
import React from 'react';

function EQSliders({ bassValue, midValue, filterValue, onBassChange, onMidChange, onFilterChange }) {
  return (
    <div className="eq-sliders">
      <div className="slider-container">
        <label>Bass</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={bassValue}
          onChange={(e) => onBassChange(e.target.value)}
        />
      </div>
      <div className="slider-container">
        <label>Mid</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={midValue}
          onChange={(e) => onMidChange(e.target.value)}
        />
      </div>
      <div className="slider-container">
        <label>Filter</label>
        <input
          type="range"
          min="20"
          max="20000"
          step="1"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default EQSliders;