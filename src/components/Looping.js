import React, { useState, useEffect } from 'react';

function Looping({ track }) {
  const [looping, setLooping] = useState(false);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(null);

  useEffect(() => {
    let interval;
    if (looping) {
      interval = setInterval(() => {
        if (track.sound.seek() >= loopEnd) {
          track.sound.seek(loopStart);
        }
      }, 100); // Check every 100 milliseconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [looping, loopStart, loopEnd, track.sound]);

  const setLoopStartTime = () => {
    setLoopStart(track.sound.seek());
  };

  const toggleLoop = () => {
    if (!looping) {
      setLoopEnd(track.sound.seek());
    }
    setLooping(!looping);
  };

  return (
    <div className="looping">
      <button onClick={setLoopStartTime} style={{ backgroundColor: 'grey', color: 'white', marginRight: '10px', marginBottom: '10px' }}>
      Set Loop Start
    </button>
      <button
        onClick={toggleLoop}
        style={{ backgroundColor: looping ? 'green' : 'gray' }}
      >
        <i className="fas fa-sync"></i> {/* Font Awesome loop icon */}
      </button>
    </div>
  );
}

export default Looping;