import React, { useState, useEffect } from 'react';

function Scratching({ track, scratchbackSound }) {
  const [scratching, setScratching] = useState(false);

  useEffect(() => {
    let interval;
    if (scratching) {
      if (track && track.sound) {
        interval = setInterval(() => {
          track.sound.seek(track.sound.seek() - 0.1); // Rewind the track
        }, 100);
      }
      if (scratchbackSound) {
        scratchbackSound.play(); // Play scratchback noise
      }
    } else {
      clearInterval(interval);
      if (scratchbackSound) {
        scratchbackSound.stop(); // Stop scratchback noise
      }
    }
    return () => clearInterval(interval);
  }, [scratching, track.sound, scratchbackSound, track]);

  const startScratching = () => {
    setScratching(true);
  };

  const stopScratching = () => {
    setScratching(false);
  };

  return (
    <div className="scratching">
      <button onMouseDown={startScratching} onMouseUp={stopScratching}>
        <img src="/recordPlayerArm.png" alt="Scratch" className="button-image" />
      </button>
    </div>
  );
}

export default Scratching;