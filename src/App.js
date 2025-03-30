import React from 'react';
import './App.css';
import CrossFader from './components/CrossFader';
import Scratching from './components/Scratching';
import TrackDeck from './components/TrackDeck';
import { Howl } from 'howler'; // Assuming you're using Howler.js for audio

function App() {
  // Initialize track1 and track2 with Howler.js
  const track1 = {
    title: 'Track 1',
    sound: new Howl({
      src: ['/audio/sexyBack.mp3'],
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
    </div>
  );
}

export default App;