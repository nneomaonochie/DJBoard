// this component is used for when we play audio

import useSound from 'use-sound';

import boopSfx from '../music.wav';

function Play () {
  const [bleh] = useSound(boopSfx);

  return <button onClick={bleh}>Boop!</button>;
};

export default Play;