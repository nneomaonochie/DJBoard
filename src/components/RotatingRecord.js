import React, { useEffect, useState } from 'react';

function RotatingRecord({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0); // For tracking initial mouse angle
  const [rotation, setRotation] = useState(0); // Track the current rotation of the record
  const [spinDirection, setSpinDirection] = useState(1); // 1 for clockwise, -1 for counterclockwise

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleStop = () => setIsPlaying(false);

    track.sound.on('play', handlePlay);
    track.sound.on('pause', handlePause);
    track.sound.on('stop', handleStop);

    return () => {
      track.sound.off('play', handlePlay);
      track.sound.off('pause', handlePause);
      track.sound.off('stop', handleStop);
    };
  }, [track.sound]);

  // Function to start the drag
  const startDrag = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Get the initial angle
    setStartAngle(angle);
  };

  // Function to handle the drag movement
  const onDrag = (e) => {
    if (!isDragging) return;

    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Current angle

    const deltaAngle = angle - startAngle; // Difference in angles to determine direction
    setRotation(rotation + deltaAngle); // Update the current rotation

    // Update spin direction based on the drag movement (clockwise or counterclockwise)
    if (deltaAngle > 0) {
      setSpinDirection(1); // Clockwise
    } else if (deltaAngle < 0) {
      setSpinDirection(-1); // Counterclockwise
    }

    // Adjust the sound position based on the drag direction
    const duration = track.sound.duration(); // Total duration of the track
    const rotationDegrees = rotation * (180 / Math.PI); // Convert radian rotation to degrees

    const newSeek = (duration * rotationDegrees) / 360; // Convert degrees to seek position
    track.sound.seek(newSeek); // Update the playback position using Howler's seek method

    setStartAngle(angle); // Update the start angle for the next drag event
  };

  // Function to stop the drag
  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`record ${isPlaying ? 'spinning' : ''}`}
      onMouseDown={startDrag} // Start dragging when mouse is down
      onMouseMove={onDrag} // Track mouse move when dragging
      onMouseUp={stopDrag} // Stop dragging when mouse is released
      onMouseLeave={stopDrag} // Handle mouse leave to stop dragging
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer',
        transform: `rotate(${rotation * (180 / Math.PI) * spinDirection}deg)`, // Dynamic rotation
        transition: isDragging ? 'none' : 'transform 0.5s ease', // Smooth transition when not dragging
      }} // Dynamically rotate the record
    >
      <img src="/record.jpeg" alt="Record" />
    </div>
  );
}

export default RotatingRecord;
