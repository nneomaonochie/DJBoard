import React, { useState } from 'react';

function Scratching({ track }) {
  const [scratching, setScratching] = useState(false);

  const startScratching = () => {
    setScratching(true);
    track.sound.rate(0.5); // Slow down for scratching effect
  };

  const stopScratching = () => {
    setScratching(false);
    track.sound.rate(1); // Reset to normal speed
  };

  return (
    <div className="scratching">
      <button onMouseDown={startScratching} onMouseUp={stopScratching}>
        Scratch
      </button>
    </div>
  );
}

export default Scratching;