import React, { useState } from 'react';
import { Howl } from 'howler';

function TrackDeck({ track }) {
  const [sound, setSound] = useState(null);

  const playTrack = () => {
    const newSound = new Howl({
      src: [track.audioFile],
      html5: true,
    });
    newSound.play();
    setSound(newSound);
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
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
      </div>
    </div>
  );
}

export default TrackDeck;
