import React, { useState } from 'react';
import RotatingRecord from './RotatingRecord';

function TrackDeck({ track }) {
  const [sound] = useState(track.sound);

  const playTrack = () => {
    if (sound) sound.play();
  };

  const pauseTrack = () => {
    if (sound) sound.pause();
  };

  const stopTrack = () => {
    if (sound) sound.stop();
  };

  return (
    <div className="track-deck">
      <h3>{track.title}</h3>
      <RotatingRecord track={track} />
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
      </div>
    </div>
  );
}

export default TrackDeck;