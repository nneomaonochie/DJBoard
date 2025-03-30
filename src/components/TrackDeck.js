/*
import React, { useState } from 'react';
import RotatingRecord from './RotatingRecord';

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);

  const playTrack = () => {
    if (sound) sound.play();
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
      <RotatingRecord track={track} />
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
      </div>
    </div>
  );
}

export default TrackDeck;
*/

/*
import React, { useState } from 'react';
import { Howl } from 'howler';
import './RotatingRecord.css'; // Assuming your record styles are in here

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);
  const [rotation, setRotation] = useState(0); // For rotating the record
  const [isPlaying, setIsPlaying] = useState(false); // Track playing state
  const [isLooping, setIsLooping] = useState(false); // Loop state

  const playTrack = () => {
    sound.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    sound.pause();
    setIsPlaying(false);
  };

  const toggleLoop = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    sound.loop(newLoopState);
  };

  const handleDrag = (e) => {
    const delta = e.movementX;
    setRotation((prevRotation) => prevRotation + delta); // Update rotation based on drag movement

    // Adjust the track's current position based on the drag direction
    const trackPosition = (rotation + delta) / 360;
    sound.seek(trackPosition * sound.duration()); // Move the track position based on the drag
  };
// <img src="/record.jpeg" alt="Record" />
  return (
    <div className="track-deck" onMouseMove={handleDrag}>
      <h3>{track.title}</h3>
      <div className="record" style={{ transform: `rotate(${rotation}deg)` }}>
        <img src="/record.jpeg" alt="Rotating Record" className="record-img" />
      </div>
      <div className="controls">
        <button onClick={playTrack}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={toggleLoop}>{isLooping ? 'Stop Loop' : 'Start Loop'}</button>
      </div>
    </div>
  );
}

export default TrackDeck;
*/

import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import './RotatingRecord.css'; // Assuming your record styles are in here

function TrackDeck({ track }) {
  const [sound] = useState(track.sound);
  const [rotation, setRotation] = useState(0); // For rotating the record
  const [isDragging, setIsDragging] = useState(false); // Track if the user is dragging
  const [audioPosition, setAudioPosition] = useState(0); // For updating the audio position
  const lastMousePosition = useRef(0); // To keep track of the last mouse position during dragging

  const playTrack = () => {
    sound.play();
  };

  const pauseTrack = () => {
    sound.pause();
  };

  const toggleLoop = () => {
    const newLoopState = !sound.loop();
    sound.loop(newLoopState);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePosition.current = e.clientX; // Set the initial mouse position when drag starts
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePosition.current; // Calculate horizontal mouse movement

      // Update rotation based on drag movement
      setRotation((prevRotation) => prevRotation + deltaX);

      // Adjust the track's current position based on rotation
      const trackPosition = (rotation + deltaX) / 360; // Get the position based on rotation
      setAudioPosition(Math.max(0, Math.min(1, trackPosition))); // Ensure the position is between 0 and 1

      // Update the audio position based on the dragging
      sound.seek(audioPosition * sound.duration());

      // Update the last mouse position for the next movement calculation
      lastMousePosition.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  const handleMouseOut = () => {
    if (isDragging) {
      setIsDragging(false); // Stop dragging if mouse leaves the element
    }
  };

  return (
    <div
      className="track-deck"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
    >
      <h3>{track.title}</h3>
      <div className="record" style={{ transform: `rotate(${rotation}deg)` }}>
        <img src="/record.jpeg" alt="Rotating Record" className="record-img" />
      </div>
      <div className="controls">
        <button onClick={playTrack}>{sound.playing() ? 'Pause' : 'Play'}</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={toggleLoop}>{sound.loop() ? 'Stop Loop' : 'Start Loop'}</button>
      </div>
    </div>
  );
}

export default TrackDeck;
