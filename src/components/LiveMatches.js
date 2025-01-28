import React from 'react';
import MatchTable from './MatchTable';
import './LiveMatches.css';

const LiveMatches = () => {
  const liveMatchesData = {
    cricket: [
      {
        tournament: "IPL 2024",
        teams: "Mumbai Indians v Chennai Super Kings",
        date: "LIVE",
        time: "85.5 Ov",
        odds: {
          back1: "1.51",
          lay1: "1.52",
          back2: "2.80",
          lay2: "2.82",
          back3: "4.90",
          lay3: "4.95"
        },
        minBet: "100",
        maxBet: "100K"
      }
    ],
    soccer: [
      {
        tournament: "Premier League",
        teams: "Arsenal v Manchester City",
        date: "LIVE",
        time: "65'",
        odds: {
          back1: "2.10",
          lay1: "2.12",
          back2: "3.40",
          lay2: "3.45",
          back3: "2.90",
          lay3: "2.95"
        },
        minBet: "100",
        maxBet: "50K"
      }
    ]
  };

  return (
    <div className="live-matches-section">
      <div className="section-header">
        <h2>Live Matches</h2>
        <span className="live-indicator">
          <span className="live-dot"></span>
          LIVE
        </span>
      </div>
      {Object.entries(liveMatchesData).map(([sport, matches]) => (
        <div key={sport} className="sport-matches">
          <MatchTable
            sport={{
              name: sport,
              displayName: sport.charAt(0).toUpperCase() + sport.slice(1),
              count: matches.length.toString()
            }}
            matches={matches}
          />
        </div>
      ))}
    </div>
  );
};

export default LiveMatches; 