import React, { useState } from 'react';
import { Howl } from 'howler';

function Looping() {
  const [isLooping, setIsLooping] = useState(false);
  const [sound, setSound] = useState(null);

  const toggleLoop = () => {
    // If the audio is playing, we stop it and create a new instance with loop option
    if (sound) {
      sound.stop();
    }

    // Create a new Howl instance with the loop option toggled
    const newSound = new Howl({
      src: ['/audio/sexyBack.mp3'], // Use your audio file here
      loop: !isLooping, // Toggle loop between true/false
      volume: 1,
    });

    setSound(newSound);

    // Start playing the sound immediately after creating the new Howl instance
    newSound.play();

    // Toggle the loop state
    setIsLooping(!isLooping);
  };

  return (
    <div>
      <h1>Audio Looping Example</h1>
      <div>
        <button onClick={toggleLoop}>
          {isLooping ? 'Stop Looping' : 'Start Looping'}
        </button>
      </div>
    </div>
  );
}

export default Looping;
