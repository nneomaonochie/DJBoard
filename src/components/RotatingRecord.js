import React, { useEffect, useState } from 'react';
import './RotatingRecord.css'; // Create this CSS file for styling

function RotatingRecord({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleStop = () => setIsPlaying(false);

    track.sound.on('play', handlePlay);
    track.sound.on('pause', handlePause);
    track.sound.on('stop', handleStop);

    return () => {
      track.sound.off('play', handlePlay);
      track.sound.off('pause', handlePause);
      track.sound.off('stop', handleStop);
    };
  }, [track.sound]);

  return (
    <div className={`record ${isPlaying ? 'spinning' : ''}`}>
      <img src="/record.jpeg" alt="Record" />
    </div>
  );
}

export default RotatingRecord;