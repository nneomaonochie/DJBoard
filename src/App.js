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
      title: 'SexyBack',
      sound: new Howl({
        src: ['/audio/sexyBack.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'We Found Love',
      sound: new Howl({
        src: ['/audio/weFoundLove.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Whiplash',
      sound: new Howl({
        src: ['/audio/whiplash.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Scream and Shout',
      sound: new Howl({
        src: ['/audio/screamAndShout.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Clarity',
      sound: new Howl({
        src: ['/audio/clarity.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Flights Booked',
      sound: new Howl({
        src: ['/audio/flights_Booked.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Nokia',
      sound: new Howl({
        src: ['/audio/nokia.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Search and Rescue',
      sound: new Howl({
        src: ['/audio/SearchAndRescue.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Clairty',
      sound: new Howl({
        src: ['/audio/clarity.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Uh Oh',
      sound: new Howl({
        src: ['/audio/uhoh.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Von Dutch',
      sound: new Howl({
        src: ['/audio/von_dutch.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Yeah!',
      sound: new Howl({
        src: ['/audio/yeah.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Crazy',
      sound: new Howl({
        src: ['/audio/crazy.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'September',
      sound: new Howl({
        src: ['/audio/september.mp3'],
        volume: 1,
      }),
    },
    {
      title: 'Billie Jean',
      sound: new Howl({
        src: ['/audio/billieJean.mp3'],
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
      <div className="track-container left">
        <TrackDeck track={selectedTracks[0]}/>
        <Scratching track={selectedTracks[0]} scratchbackSound={scratchbackSound} />
      </div>
      <div className="track-container right">
        <TrackDeck track={selectedTracks[1]} />
        <Scratching track={selectedTracks[1]} scratchbackSound={scratchbackSound} />
      </div>
      <div className="looping-container">
        <Looping track={selectedTracks[0]} />
        <Looping track={selectedTracks[1]} />
      </div>
      <CrossFader className="crossfader" track1={selectedTracks[0]} track2={selectedTracks[1]} />
      <TrackList tracks={tracks} onSelectTrack={handleSelectTrack} /> {/* Move TrackList here */}
    </div>
  );
}

export default App;