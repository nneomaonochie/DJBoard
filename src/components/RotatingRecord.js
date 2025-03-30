import React, { useState, useEffect } from 'react';

function RotatingRecord({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0); // To track initial angle of the mouse
  const [rotation, setRotation] = useState(0); // Track rotation of the record (in degrees)

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

  // Start dragging when mouse is down
  const startDrag = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Initial angle of mouse position
    setStartAngle(angle); // Set initial angle
  };

  // Track mouse movement while dragging
  const onDrag = (e) => {
    if (!isDragging) return;

    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Current angle of mouse position

    const deltaAngle = angle - startAngle; // Calculate difference in angle (clockwise or counter-clockwise)
    const rotationIncrement = deltaAngle * (180 / Math.PI); // Convert radians to degrees
    setRotation(prevRotation => prevRotation + rotationIncrement); // Increment rotation value

    const duration = track.sound.duration(); // Get the track's total duration
    const rotationDegrees = rotation + rotationIncrement; // Current degrees of rotation

    const newSeek = (duration * rotationDegrees) / 360; // Calculate new seek position for the track
    track.sound.seek(newSeek); // Update audio position based on the drag

    setStartAngle(angle); // Update the start angle for next movement
  };

  // Stop dragging when mouse is up or leaves the record
  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`record ${isPlaying && !isDragging ? 'spinning' : ''}`} // Add spinning only if playing and not dragging
      onMouseDown={startDrag} // Start drag when mouse is pressed
      onMouseMove={onDrag} // Track mouse movement while dragging
      onMouseUp={stopDrag} // Stop drag when mouse is released
      onMouseLeave={stopDrag} // Stop drag if mouse leaves the record area
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer', // Change cursor to grabbing when dragging
        transform: `rotate(${rotation}deg)`, // Dynamically apply rotation based on mouse drag
        transition: isDragging ? 'none' : 'transform 0.5s ease', // Smooth transition when not dragging
      }}
    >
      <img src="/record.jpeg" alt="Record" />
    </div>
  );
}

export default RotatingRecord;
