import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ audioSrc, startTime, endTime }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc)); // Reference to the audio element

  useEffect(() => {
    // Set up the event listener to loop the audio from startTime to endTime
    const audio = audioRef.current;

    // Function to handle looping of the segment
    const handleTimeUpdate = () => {
      if (audio.currentTime >= endTime) {
        audio.currentTime = startTime; // Reset to the start time
        audio.play(); // Continue playing
      }
    };

    // Add event listener for time update
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [startTime, endTime]);

  // Play or pause the audio
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.currentTime = startTime; // Ensure the audio starts at the correct time
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
