import React, { useState } from 'react';
import { Howl } from 'howler';
import Looping from './components/Looping';

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
