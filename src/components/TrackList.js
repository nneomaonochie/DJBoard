import React from 'react';

function TrackList({ tracks, onSelectTrack }) {
  return (
    <div className="track-list">
      <h3>Track List</h3>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.title}
            <button onClick={() => onSelectTrack(track, 0)}>Set as Track 1</button>
            <button onClick={() => onSelectTrack(track, 1)}>Set as Track 2</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;