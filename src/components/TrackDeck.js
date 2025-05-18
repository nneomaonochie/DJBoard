/*

import React, { useState, useEffect } from 'react';
import RotatingRecord from './RotatingRecord';
import Scratching from './Scratching';
import '../App.css'; // Ensure you have the CSS import for Font Awesome

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);

  useEffect(() => {
    const currentSound = sound;
    currentSound.stop();
    const newSound = track.sound;
    setSound(newSound);
  }, [track, sound]);

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
      <h3 className="track-title">{track.title}</h3>
      <div className="record-container">
        <RotatingRecord track={track} />
      </div>
      <div className="controls">
        <button onClick={playTrack} className="icon-button">
          <i className="fas fa-play"></i>
        </button>
        <button onClick={pauseTrack} className="icon-button">
          <i className="fas fa-pause"></i>
        </button>
        <button onClick={stopTrack} className="icon-button">
          <i className="fas fa-stop"></i>
        </button>
      </div>
    </div>
  );
}

export default TrackDeck;

*/

import React, { useState, useEffect } from 'react';
import RotatingRecord from './RotatingRecord';
import '../App.css'; // Ensure you have the CSS import for Font Awesome

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);

  useEffect(() => {
    const currentSound = sound;
    currentSound.stop();
    const newSound = track.sound;
    setSound(newSound);

    if (track.bpm && window.Tone) {
      window.Tone.Transport.bpm.value = track.bpm;
    }
  }, [track, sound]);

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
      <h3 className="track-title">{track.title}</h3>
      {track.bpm && <p className="track-bpm">BPM: {track.bpm}</p>}
      <div className="record-container">
        <RotatingRecord track={track} />
      </div>
      <div className="controls">
        <button onClick={playTrack} className="icon-button">
          <i className="fas fa-play"></i>
        </button>
        <button onClick={pauseTrack} className="icon-button">
          <i className="fas fa-pause"></i>
        </button>
        <button onClick={stopTrack} className="icon-button">
          <i className="fas fa-stop"></i>
        </button>
      </div>
    </div>
  );
}

export default TrackDeck;
