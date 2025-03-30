
// REGULAR

/*
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
*/

// DRAGGING Attempt 1


import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import './RotatingRecord.css'; // Make sure you import the CSS

function RotatingRecord() {
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [rotation, setRotation] = useState(0); // Current rotation angle of the record
  const [audioPosition, setAudioPosition] = useState(0); // Current audio position
  const recordRef = useRef(null); // Reference to the record element

  // Initialize audio
  const sound = new Howl({
    src: ['./your-audio-file.mp3'], // Replace with the actual path to your audio file
    html5: true,
    loop: true,
  });

  useEffect(() => {
    sound.play();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const centerX = recordRef.current.offsetLeft + recordRef.current.offsetWidth / 2;
      const centerY = recordRef.current.offsetTop + recordRef.current.offsetHeight / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI); // Calculate the angle
      const rotationDelta = angle - rotation; // Determine if the drag is clockwise or counterclockwise

      // Update rotation
      setRotation(angle);

      // Update audio position based on drag direction
      if (rotationDelta > 0) {
        // Clockwise, fast forward the audio
        setAudioPosition(Math.min(sound.duration(), audioPosition + 0.1));
      } else {
        // Counterclockwise, rewind the audio
        setAudioPosition(Math.max(0, audioPosition - 0.1));
      }

      // Update the sound's playback position
      sound.seek(audioPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseOut = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div
      className="record"
      ref={recordRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      style={{ transform: `rotate(${rotation}deg)` }} // Apply rotation style dynamically
    >
      <img src="/record.jpeg" alt="Record" />
    </div>
  );
}

export default RotatingRecord;
