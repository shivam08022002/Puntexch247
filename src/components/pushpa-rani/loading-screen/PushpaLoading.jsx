import React, { useState, useEffect } from "react";
import pushpaLogo from '../../assets/pushpa-logo.png';
import headFront from '../../assets/head-front.png';
import "./PushpaLoading.css"; // Assuming the CSS is in this file

const PushpaLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set up an interval to simulate the loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval once progress reaches 100
          return 100;
        }
        return prevProgress + 1; // Increase the progress by 1%
      });
    }, 30); // Adjust the speed of loading here (30ms interval)

    // Clean up the interval when the component is unmounted or completed
    return () => clearInterval(interval);
  }, []);

  return (
<div className="pushpa-rani-loading-screen">
  <img className="pushpa-rani-loading-logo" src={pushpaLogo} alt="Logo" />

  {/* Wrapper ensures correct positioning */}
  <div className="pushpa-rani-loading-wrapper">
    {/* Car positioned above the loading bar */}
    <img 
      className="pushpa-rani-head-icon" 
      src={headFront} 
      alt="Car"
      style={{ 
        left: `calc(${progress}% - 12%)`, /* Adjusted for exact start and end */
        transform: "translateX(-50%)" 
      }}  
    />

    <div className="pushpa-rani-loading-bar-container">
      <div className="pushpa-rani-loading-bar" style={{ width: `${progress}%` }}></div>
    </div>
  </div>

  <span className="pushpa-rani-progress-text">{progress}%</span>
</div>

  );
};

export default PushpaLoading;