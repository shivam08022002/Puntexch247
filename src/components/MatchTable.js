import React from 'react';
import './MatchTable.css';
import { useNavigate } from 'react-router-dom';
import { FaTv, FaStar } from 'react-icons/fa'; // Add these imports

const MatchTable = ({ sport, matches }) => {
  const navigate = useNavigate();

  const handleMatchClick = (id) => {
    navigate(`/match/${id}`);
  };

  return (
    <div className="sport-section">
      <div className="sport-header">
        <div className="sport-info">
          <img 
            src="data:image/webp;base64,UklGRmgEAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSFwBAAABkGvb1rE9+zcvgBVilK7+KrZZ20llG1UqG++XC1Bto7KddB9fPTt4n/Oe5x+5gIiYAIhPGUrzU6DvU37RQZTiRrNayLTPy7RIfvS8jyRvehlDBlWWQ1wsM6QHZEhOQ0Uk2U/yvKRGq2w+Sd79Z+CaBW1AF3UGGZIEgGF5ksyuna7QWInFhiQBYDutD9OZ7OdjhiQBoM3Y/k1hx78e3SHxu7vdSaHWCGNbl/RcaUSR9s1Je3SOFGn3Yf2lIjXLbF3ZpOxhlfgVhH2vGNJc7ztN5QPkrWPGtAKWy6IPUE0aW5J8qHcwtkRh1AN6r0uUBnCQ8v/yMXawXPS+R6Q33pe8b6/QG+9TOgt6E32Kp+lN9Nk9JvnsHpMCCt/fduFT+KEj42AfhZ874AI/BB7c9Pqu5KdD01eFEllQQN+vZEjyEnCJ5BRUhKSvgd7Pnw1/xfwUYEqeL5uAk8YckwFWUDgg5gIAADAPAJ0BKigAKAA+kTqYSKWjIiEuNAzIsBIJbAC7OYGOPcjiO3YM9BztPol3oj0AOlDwADpd9DvyN2AygfaT3QHQh4D0ZvnTZtHpD/me4b+qfVa9Dv9TSD/0WT8qxq3mz4vvPD0GPwDxDLMEriRAZE8FNwNds4+rhSwJvd3d5CpnlAAA86rbcB55AK65j/zwjVHk1iqcOtTQ3hq1K+2H/qVOo3Sas6fio1a7w8b4wBaa3ngIXp7quNkLw4+P2zox9C+t0WldhfgAkGyr+F9nIx/KP3TPyqe4+vOuh75FEe4j/EsBF1ZigrJ2dXYgawT0f+rObF0nltdbRl8RiBSndAW+Cavl/8ll7ZNAGtF/vXKyjf/2YG+uVRj+4r/k9IhEUpVCCZpHd+OH8mRbue/yQv4eFDT5TH5W3Lt+QL3Lv2na+yDmCJC0BASvLfBx3VckxqaaoFLUe0NlH/DxNWNh3N0gvfVJmvg5SiamejEFt2B01f8MYiG+dIM1405I3UR+FX4fFchRcDtJ6ODpsHioAdyeBcBZIiKBlHM58MP9tyuV12B1PE5K3hxVsTaHE7RtlMVqv/QE/Jnd85a+PxGSnosay6whHH8gTliAUHG/xPWX2POg1LszltiZ695xwj5MmZiTN3VpVAfZ1/9T7nCDIobF0SoDwpYLxhf7p+J8qwH5jpONLaWjdsvuRT3afxHex+2grseA+XnlXaSbr+Ds+1yoHM9V6f08/wcH43ebxMJOHEQF1KVGh2u9HvjyCtZAsGrB5RB8XFB5/Qe1jH//SEPw82VvUq14sweEeu57U4yeAmIO6cBhvhasf+H+2m9fO1fj6x+Pt5LobAPxI2q2TQ6TXGMTC4+p0EwC7N7Xd+57y+tfOCC9SfQJgw1YbdgsD3SacKCdeJX8S/QAJBgir+CnyfYIyG6a47y6LRT9qTs7f/KnfVTRkF14RInmghsglhEz4oh1U8GKRYaiE6Vk/2KAGMAAAAA="
            alt="Cricket"
            className="sport-icon2"
          />
          <h2>{sport.displayName}</h2>
          {/* <span className="match-count">{sport.count}</span> */}
        </div>
        <div className="match-filters">
          <button className="filter-btn live active">Live</button>
          <button className="filter-btn upcoming">Upcoming</button>
        </div>
      </div>
      <div className="matches-container">
        {matches.map((match, index) => (
          <div
            key={index}
            className="match-row"
            onClick={() => handleMatchClick(match.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="match-info">
              <div className="team-names">{match.name}</div>
              <div className="match-details">
                <div className="match-time">
                  <div>
                  <span className="date">{match.openDate}</span>
                  <span className="time">{match.time}</span>
                  </div>
                  <div className="match-actions">
                    <FaTv className="action-icon" />
                    <FaStar className="action-icon" />
                  </div>
                </div>
                <div className="odds-grid">
                  <div className="odds-header">
                    {/* <span>Back</span>
                    <span>Lay</span> */}
                  </div>
                  <div className="odds-group">
                    <div className="back-odds">
                      <button className="odds-cell">-</button>
                      <button className="odds-cell">-</button>
                      <button className="odds-cell">-</button>
                    </div>
                    <div className="lay-odds">
                      <button className="odds-cell">-</button>
                      <button className="odds-cell">-</button>
                      <button className="odds-cell">-</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bet-limits">
                <span>Min: 200</span>
                <span>Max: 25k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTable;
