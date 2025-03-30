/*
import React from 'react';
import './App.css';
import CrossFader from './components/CrossFader';
import Scratching from './components/Scratching';
import TrackDeck from './components/TrackDeck';
import Looping from './components/Looping';
import { Howl } from 'howler'; // Assuming you're using Howler.js for audio

function App() {
  // Initialize track1 and track2 with Howler.js
  const track1 = {
    title: 'Track 1',
    sound: new Howl({
      src: ['/audio/SexyBack.mp3'],
      volume: 1,
    }),
  };

  const track2 = {
    title: 'Track 2',
    sound: new Howl({
      src: ['/audio/weFoundLove.mp3'],
      volume: 1,
    }),
  };

  // Initialize scratchbackSound with Howler.js
  const scratchbackSound = new Howl({
    src: ['audio/scratchback.mp3'],
    volume: 1,
  });

  return (
    <div className="dj-board">
      <TrackDeck track={track1} />
      <TrackDeck track={track2} />
      <CrossFader track1={track1} track2={track2} />
      <Scratching track={track1} scratchbackSound={scratchbackSound} />
      <Scratching track={track2} scratchbackSound={scratchbackSound} />
      <Looping track={track1} />
      <Looping track={track2} />
    </div>
  );
}

export default App;
*/
import React, { useState, useEffect } from 'react';
import './App.css';
import CrossFader from './components/CrossFader';
import Scratching from './components/Scratching';
import TrackDeck from './components/TrackDeck';
import Looping from './components/Looping';
import RotatingRecord from './components/RotatingRecord';  // Importing the new record component
import { Howl } from 'howler'; // Assuming you're using Howler.js for audio

function App() {
  // Initialize track1 and track2 with Howler.js
  const track1 = {
    title: 'Track 1',
    sound: new Howl({
      src: ['/audio/weFoundLove.mp3'], // switch back later
      volume: 1,
      html5: true,
    }),
  };

  const track2 = {
    title: 'Track 2',
    sound: new Howl({
      src: ['/audio/SexyBack.mp3'],
      volume: 1,
      html5: true,
    }),
  };

  // Initialize scratchbackSound with Howler.js
  const scratchbackSound = new Howl({
    src: ['/audio/scratchback.mp3'],
    volume: 1,
  });

  // Function to update the track position from the rotating record
  const updateTrackPosition = (track, position) => {
    track.sound.seek(position); // Update track position with the new one
  };

  return (
    <div className="dj-board">
      {/* Passing the track and position updater function to RotatingRecord */}
      <RotatingRecord track={track1} updateTrackPosition={updateTrackPosition} />
      <RotatingRecord track={track2} updateTrackPosition={updateTrackPosition} />
      
      <TrackDeck track={track1} />
      <TrackDeck track={track2} />
      <CrossFader track1={track1} track2={track2} />
      <Scratching track={track1} scratchbackSound={scratchbackSound} />
      <Scratching track={track2} scratchbackSound={scratchbackSound} />
      <Looping track={track1} />
      <Looping track={track2} />
    </div>
  );
}

export default App;
