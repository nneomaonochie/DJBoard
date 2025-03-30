import React, { useState, useEffect } from 'react';

function RotatingRecord({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0); // Initial angle of mouse
  const [rotation, setRotation] = useState(0); // Current rotation in degrees
  const [lastSeekTime, setLastSeekTime] = useState(0); // Throttle seek calls
  const [animationFrameId, setAnimationFrameId] = useState(null); // To manage smooth updates during drag
  const [glowColor, setGlowColor] = useState('rgba(0, 255, 255, 0.8)'); // Default glow color

  // Function to generate a random glow color
  const getRandomGlowColor = () => {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgba(${r}, ${g}, ${b}, 0.8)`; // Return a random RGB color with an alpha value of 0.8
  };

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
      setGlowColor(getRandomGlowColor()); // Set a random glow color when track plays
    };
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
  }, [track.sound]); // Re-run the effect if track.sound changes

  // Start dragging
  const startDrag = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Get angle of mouse relative to center
    setStartAngle(angle); // Set the initial angle when drag starts
  };

  // Continuous dragging logic using requestAnimationFrame
  const onDrag = (e) => {
    if (!isDragging) return;

    // Get the mouse position relative to the center of the record
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // Get angle of mouse relative to center

    const deltaAngle = angle - startAngle; // Calculate difference in angle
    const rotationIncrement = deltaAngle * (180 / Math.PI); // Convert angle difference to degrees
    setRotation((prevRotation) => prevRotation + rotationIncrement); // Update rotation

    const duration = track.sound.duration(); // Get the total duration of the track
    const newSeek = (duration * rotation) / 360; // Calculate the new seek position based on the rotation

    const currentTime = Date.now();
    if (currentTime - lastSeekTime > 50) { // Throttle the seek update
      track.sound.seek(newSeek); // Update the sound's position
      setLastSeekTime(currentTime); // Update last seek time for throttling
    }

    setStartAngle(angle); // Update start angle for next move

    // If the drag has ended or been canceled, stop the animation frame
    if (!animationFrameId) {
      const id = requestAnimationFrame(() => {
        setAnimationFrameId(id); // Keep track of the animation frame id
      });
    }
  };

  // Stop dragging
  const stopDrag = () => {
    setIsDragging(false);
    cancelAnimationFrame(animationFrameId); // Stop the animation frame on drag end
    setAnimationFrameId(null); // Clear the animation frame id
  };

  return (
    <div
      className={`record ${isPlaying && !isDragging ? 'spinning' : ''}`} // Only spin if the track is playing and not being dragged
      onMouseDown={startDrag} // Start drag on mouse down
      onMouseMove={onDrag} // Track mouse movement while dragging
      onMouseUp={stopDrag} // Stop dragging on mouse up
      onMouseLeave={stopDrag} // Stop dragging if mouse leaves the record area
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer', // Change cursor while dragging
        transform: `rotate(${rotation}deg)`, // Rotate the record based on drag
        transition: isDragging ? 'none' : 'transform 0.5s ease', // Smooth transition for spinning when not dragging
        boxShadow: isPlaying && !isDragging ? `0 0 15px 5px ${glowColor}` : 'none', // Glowing effect with random color
      }}
    >
      <img src="/record.jpeg" alt="Record" />
    </div>
  );
}

export default RotatingRecord;
