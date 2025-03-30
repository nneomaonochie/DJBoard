import React, { useState } from 'react';

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);

  const playTrack = () => {
    if (sound) sound.play();
  };

  const pauseTrack = () => {
    if (sound) sound.pause();
  };

  const stopTrack = () => {
    if (sound) sound.stop();
  };

  const loopTrack = () => {
    if (sound) sound.loop();
  };

  return (
    <div className="track-deck">
      <h3>{track.title}</h3>
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
        <button onClick={loopTrack}>Loop</button>
      </div>
    </div>
  );
}

export default TrackDeck;