import React, { useState } from 'react';
import { Howl } from 'howler';


function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);
  const [isLooping, setIsLooping] = useState(false); // Track loop state

  const playTrack = () => {
    const newSound = new Howl({
      src: [sound],
      html5: true,
      loop: isLooping,
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

    const toggleLoop = () => {
    if (sound) {
      const newLoopState = !isLooping;
      setIsLooping(newLoopState);
      sound.loop(newLoopState); // Toggle loop dynamically
    }
  };

  return (
    <div className="track-deck">
      <h3>{track.title}</h3>
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
        <button onClick={toggleLoop}>
          {isLooping ? 'Stop Loop' : 'Start Loop'}
        </button>
      </div>
    </div>
  );
}

export default TrackDeck;