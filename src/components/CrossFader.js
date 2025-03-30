import React, { useState } from 'react';

function Crossfader({ track1, track2 }) {
  const [position, setPosition] = useState(50);

  const crossfade = () => {
    const volume1 = 1 - position / 100;
    const volume2 = position / 100;
    track1.sound.volume(volume1);
    track2.sound.volume(volume2);
  };

  useEffect(() => {
    crossfade();
  }, [position]);

  return (
    <div className="crossfader">
      <label>Crossfader</label>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
    </div>
  );
}

export default Crossfader;