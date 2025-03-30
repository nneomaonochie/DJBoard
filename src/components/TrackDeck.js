import React, { useState, useEffect } from 'react';
import RotatingRecord from './RotatingRecord';

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);

  useEffect(() => {
    const currentSound = sound;
    currentSound.stop();
    const newSound = track.sound;
    setSound(newSound);
  }, [track, sound]);

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
      <h3 className="track-title">{track.title}</h3> {/* Move title above */}
      <div className="record-container">
        <RotatingRecord track={track} />
      </div>
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
      </div>
    </div>
  );
}

export default TrackDeck;