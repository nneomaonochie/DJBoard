import React from 'react';

function CrossFader({ track1, track2 }) {
  const handleCrossFade = (event) => {
    const value = event.target.value;
    track1.sound.volume(1 - value / 100);
    track2.sound.volume(value / 100);
  };

  return (
    <div className="crossfader-container">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="crossfader-slider"
        onChange={handleCrossFade}
      />
    </div>
  );
}

export default CrossFader;