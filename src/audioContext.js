// audioContext.js
export const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const createEQNodes = () => {
  const bassGain = audioContext.createGain();
  const midGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';

  return { bassGain, midGain, filter };
};