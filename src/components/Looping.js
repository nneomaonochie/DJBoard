import React, { useState } from 'react';

function Looping({ track }) {
  const [looping, setLooping] = useState(false);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(null);

  const setLoopStartTime = () => {
    setLoopStart(track.sound.seek());
  };

  const toggleLoop = () => {
    if (looping) {
      setLoopEnd(track.sound.seek());
      track.sound.on(track.sound.seek() >= loopEnd, track.sound.seek(loopStart))
    } else {
      track.sound.off('end');
    }
    setLooping(!looping);
  };

  return (
    <div className="looping">
      <button onClick={setLoopStartTime}>Set Loop Start</button>
      <button onClick={toggleLoop}>Loop</button>
    </div>
  );
}

export default Looping;