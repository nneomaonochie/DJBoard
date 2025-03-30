import React, { useState, useEffect } from 'react';
import RotatingRecord from './RotatingRecord';
import EQSliders from './EQSliders';
import { audioContext, createEQNodes } from '../audioContext';

function TrackDeck({ track }) {
  const [sound, setSound] = useState(track.sound);
  const [eqNodes, setEqNodes] = useState(createEQNodes());
  const [bassValue, setBassValue] = useState(1);
  const [midValue, setMidValue] = useState(1);
  const [filterValue, setFilterValue] = useState(350);

  useEffect(() => {
    const currentSound = sound;
    currentSound.stop();
    const newSound = track.sound;
    setSound(newSound);

    // Disconnect previous nodes
    if (currentSound._sounds[0] && currentSound._sounds[0]._node) {
      currentSound._sounds[0]._node.disconnect();
    }

    // Connect Howler sound to EQ nodes
    const source = audioContext.createMediaElementSource(newSound._sounds[0]._node);
    source.connect(eqNodes.bassGain).connect(eqNodes.midGain).connect(eqNodes.filter).connect(audioContext.destination);

    // Update EQ nodes
    setEqNodes(createEQNodes());
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

  const handleBassChange = (value) => {
    setBassValue(value);
    eqNodes.bassGain.gain.value = value;
  };

  const handleMidChange = (value) => {
    setMidValue(value);
    eqNodes.midGain.gain.value = value;
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
    eqNodes.filter.frequency.value = value;
  };

  return (
    <div className="track-deck">
      <h3 className="track-title">{track.title}</h3> {/* Move title above */}
      <div className="record-container">
        <RotatingRecord track={track} />
      </div>
      <div className="controls">
        <button onClick={playTrack}>Play</button>
        <button onClick={pauseTrack}>Pause</button>
        <button onClick={stopTrack}>Stop</button>
      </div>
      <EQSliders
        bassValue={bassValue}
        midValue={midValue}
        filterValue={filterValue}
        onBassChange={handleBassChange}
        onMidChange={handleMidChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default TrackDeck;