import { useState, useEffect, useRef } from "react";
import "./PushpaMultiplier.css"; // Import CSS file
import { FaHistory,FaCaretDown,FaTimes } from "react-icons/fa"; // Import icons

const MultiplierHistory = ({ isPlaneCrashed }) => {
  const [multipliers, setMultipliers] = useState([]);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const containerRef = useRef(null);
  const [maxVisible, setMaxVisible] = useState(10);
  const prevIsPlaneCrashed = useRef(isPlaneCrashed);

  // Function to fetch the latest multiplier
  const fetchLatestMultiplier = async () => {
    setMultipliers((prev) => [1.55, ...prev]);
    try {
      const accessToken = localStorage.getItem("refreshToken");
      const response = await fetch(
        "http://192.168.174.164:8172/games/api/v1/virtual-games/aviator/getMultiplierHistory?gameName=aviator",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        setMultipliers((prev) => [data[0], ...prev]); // Add latest multiplier to history
      }
    } catch (error) {
      console.error("Error fetching multiplier:", error);
    }
  };

  // Detect crash transition from true → false and fetch multiplier
  useEffect(() => {
    if (prevIsPlaneCrashed.current && !isPlaneCrashed) {
      fetchLatestMultiplier(); // Fetch new multiplier when plane stops crashing
    }
    prevIsPlaneCrashed.current = isPlaneCrashed;
  }, [isPlaneCrashed]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 50; // Approximate width of each multiplier
        const count = Math.floor(containerWidth / itemWidth);
        setMaxVisible(count);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [multipliers]);

  return (
    <div className="pushpa-history-container">
      {/* Full History (Overlaps the Row, Keeps Button Visible) */}
      {showFullHistory && (
        <div className="pushpa-full-history">
          <div className="pushpa-full-history-header">
            <h3>ROUND HISTORY</h3>
            <button className="pushpa-close-button" onClick={() => setShowFullHistory(false)}>
              <FaTimes/>
            </button>
          </div>
          <div className="pushpa-history-grid">
            {multipliers.map((multiplier, index) => (
              <span
                key={index}
                className={`pushpa-multiplier ${
                  multiplier >= 10 ? "pushpa-pink" : multiplier >= 2 ? "pushpa-purple" : "pushpa-blue"
                }`}
              >
                {multiplier.toFixed(2)}x
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Row (Remains Clickable) */}
      <div className="pushpa-multiplier-container" ref={containerRef}>
        <div className={`pushpa-multipliers ${showFullHistory ? "blurred" : ""}`}>
          {multipliers.slice(0, maxVisible).map((multiplier, index) => (
            <span
              key={index}
              className={`pushpa-multiplier ${
                multiplier >= 10 ? "pushpa-pink" : multiplier >= 2 ? "pushpa-purple" : "pushpa-blue"
              }`}
            >
              {multiplier.toFixed(2)}x
            </span>
          ))}
        </div>

      </div>
        {/* History Button (Opens Dropdown)
        <button
          className="pushpa-history-button"
          onClick={() => setShowFullHistory(true)}
        >
          <FaHistory />
          <FaCaretDown className="pushpa-dropdown-icon" />
        </button> */}
      {/* <button className="test-button" onClick={addMultiplier}>Add Random Multiplier</button> */}
    </div>
  );
};

export default MultiplierHistory;
