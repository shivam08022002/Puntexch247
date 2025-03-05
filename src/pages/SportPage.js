import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchTable from '../components/MatchTable';
import './SportPage.css';
import { httpHelpers } from "../services/httpHelpers";
import {
  CRICKET
} from '../common/constants';

const SportPage = ({ isLoggedIn, logOut, selectedSport }) => {
  console.log("selectedSport", selectedSport);
  const getLiveGames = "/gamma/getAllMatches";
  const [matches, setMatches] = useState(null);
  const [matchType, setMatchType] = useState('LIVE');
  const [loading, setLoading] = useState(true); // Add loading state
  const api = httpHelpers();
  let navigate = useNavigate();

  const fetchMatches = async (type) => {
    setLoading(true); // Set loading true before fetch
    let endpoint = `${getLiveGames}`;
    
    // Always include cricket for both inplay and cricket selection
    if (selectedSport === "inplay" || selectedSport === "cricket") {
      endpoint += `?sportType=cricket`;
    } else {
      endpoint += `?sportType=${selectedSport}`;
    }
    
    endpoint += `&matchStatus=${type}`;

    api
      .get(endpoint)
      .then(res => {
        if (res && res.data && res.data.length > 0) {
          setMatches(res.data);
        } else {
          setMatches(null);
        }
        setLoading(false); // Set loading false after data received
      })
      .catch(err => {
        console.log("error error", err);
        setMatches(null);
        setLoading(false); // Set loading false on error
        if (err?.data?.status === 401 || err?.response?.status === 401) {
          logOut();
        }
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      setMatchType('LIVE'); // Reset to LIVE when sport changes
      fetchMatches('LIVE');
    }
  }, [selectedSport]);

  const handleMatchTypeChange = (type) => {
    setMatchType(type);
    fetchMatches(type);
  };

  const currentSportName = selectedSport ? selectedSport.toLowerCase() : '';

  // Define banners for each sport
  const banners = {
    cricket: {
      title: "Cricket Live",
      tagline: "Experience the Thrill of the Game",
      bgImage: "https://t3.ftcdn.net/jpg/08/41/19/60/360_F_841196054_kcxsM3eaUWER06YEGygooW46zyl4aqj0.jpg"
    },
    football: {
      title: "Football Matches",
      tagline: "The Beautiful Game Awaits",
      bgImage: "https://www.shutterstock.com/image-illustration/abstract-silhouette-football-soccer-player-600nw-2293156091.jpg"
    },
    tennis: {
      title: "Tennis Live",
      tagline: "Serve, Rally, Score",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-tennis-player-on-260nw-2170057791.jpg"
    },
    basketball: {
      title: "Basketball Live",
      tagline: "Feel the Rhythm of the Game",
      bgImage: "https://t4.ftcdn.net/jpg/04/88/65/81/360_F_488658114_B8vBzGIbzYY9EtmCMqdl5ZMTucUsvkGs.jpg"
    },
    volleyball: {
      title: "Volleyball Live",
      tagline: "Spike Your Way to Victory",
      bgImage: "https://www.shutterstock.com/image-vector/abstract-silhouette-volleyball-player-on-260nw-2181473969.jpg"
    }
  };

  // Get current sport's banner and data
  const currentBanner = banners[currentSportName] || banners['inplay'];

  // Only render if we have a valid sport
  if (!currentBanner) {
    return null;
  }

  return (
    <div className="sport-page">
      {selectedSport !== "inplay" && (
        <div
          className="sport-banner"
          style={{ backgroundImage: `url(${currentBanner.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="banner-content">
            <div className="banner-icon">{currentBanner.icon}</div>
            <div className="banner-text">
              <h1>{currentBanner.title}</h1>
              <p>{currentBanner.tagline}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="sport-content">
        {loading ? (
          <div className="loading-message">
            <h3>Loading {currentSportName === 'inplay' ? 'Cricket' : currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)} Matches...</h3>
          </div>
        ) : matches ? (
          <MatchTable
            sport={{
              name: currentSportName,
              displayName: currentSportName === 'inplay' ? 'Cricket' : currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)
            }}
            matches={matches}
            matchType={matchType}
            onMatchTypeChange={handleMatchTypeChange}
          />
        ) : (
          <div className="no-matches-message">
            <h3>{currentSportName === 'inplay' ? 'Cricket' : currentSportName.charAt(0).toUpperCase() + currentSportName.slice(1)} Matches Currently Unavailable</h3>
            <p>Please check back later for {matchType.toLowerCase()} matches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportPage;
