import logo from './logo.svg';
import './App.css';
import './components/Play'
import React from 'react';
import CrossFader from './components/CrossFader.js';
import Scratching from './components/Scratching.js';

function App() {
  const track1 = { title: 'Track 1', audioFile: 'track1.mp3' };
  const track2 = { title: 'Track 2', audioFile: 'track2.mp3' };

  return (
    <div className="dj-board">
      <TrackDeck track={track1} />
      <Waveform audioFile={track1.audioFile} />
      <TrackDeck track={track2} />
      <Waveform audioFile={track2.audioFile} />
      <DJControls />
      <Crossfader track1={track1} track2={track2} />
      <Looping track={track1} />
      <Scratching track={track1} />
    </div>
  );
}

export default App;
