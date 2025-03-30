import React, { useState } from 'react';
import './App.css';
import CrossFader from './components/CrossFader';
import Scratching from './components/Scratching';
import TrackDeck from './components/TrackDeck';
import Looping from './components/Looping';
import TrackList from './components/TrackList';
import { Howl } from 'howler'; // Assuming you're using Howler.js for audio

function App() {
  const tracks = [
    {
      title: 'Track 1',
      sound: new Howl({
        src: ['/audio/SexyBack.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Track 2',
      sound: new Howl({
        src: ['/audio/weFoundLove.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Track 3',
      sound: new Howl({
        src: ['/audio/anotherTrack.mp3'],
        volume: 1,
      }),
    },
  ];

  const [selectedTracks, setSelectedTracks] = useState([tracks[0], tracks[1]]);

  const handleSelectTrack = (track, index) => {
    const updatedTracks = [...selectedTracks];
    updatedTracks[index] = track;
    setSelectedTracks(updatedTracks);
  };

  const scratchbackSound = new Howl({
    src: ['audio/scratchback.mp3'],
    volume: 1,
  });

  return (
    <div className="dj-board">
      <TrackList tracks={tracks} onSelectTrack={handleSelectTrack} />
      <div className="track-container left">
        <TrackDeck track={selectedTracks[0]} />
        <div className="buttons-row">
          <Scratching track={selectedTracks[0]} scratchbackSound={scratchbackSound} />
          <Looping track={selectedTracks[0]} />
        </div>
      </div>
      <div className="track-container right">
        <TrackDeck track={selectedTracks[1]} />
        <div className="buttons-row">
          <Scratching track={selectedTracks[1]} scratchbackSound={scratchbackSound} />
          <Looping track={selectedTracks[1]} />
        </div>
      </div>
      <CrossFader className="crossfader" track1={selectedTracks[0]} track2={selectedTracks[1]} />
    </div>
  );
}

export default App;