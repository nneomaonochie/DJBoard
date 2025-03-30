import React from 'react';

function TrackList({ tracks, onSelectTrack }) {
  return (
    <div className="track-list">
      <h3>Track List</h3>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.title}
            <button onClick={() => onSelectTrack(track, 0)}>Set as Left</button>
            <button onClick={() => onSelectTrack(track, 1)}>Set as Right</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;