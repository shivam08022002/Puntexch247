import React, { useState, useEffect } from 'react';
import { FaExchangeAlt, FaChartLine, FaLock, FaTv, FaCheck } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import './MatchDetailsPage.css';
import { clearMessage } from "../actions/message";
import { useDispatch, useSelector } from "react-redux";
import { httpHelpers } from "../services/httpHelpers";
import {
  MATCH_ODDS,
  BOOKMAKER,
  FANCY_BET,
  TOSS_ODDS,
  BACK,
  LAY,
  NO,
  YES,
  TIED_MATCH,
  DRAW_MATCH
} from '../common/constants';

const OddsMarket = ({ marketType, oddsList, minBet, maxBet, waitTime }) => {
  let teamA;
  let teamB;
  let theDraw;
  let tiedYes;
  let tiedNo;

  let hasOdds = false;

  oddsList.forEach((odds) => {
    if (odds.nation === "Yes" || odds.nation === "YES") {
      if (odds.marketName === "Tied Match" || odds.marketName === "TIED_MATCH") {
        hasOdds = true;
        tiedYes = odds;
      }
    } else if (odds.nation === "No" || odds.nation === "NO") {
      if (odds.marketName === "Tied Match" || odds.marketName === "TIED_MATCH") {
        hasOdds = true;
        tiedNo = odds;
      }
    } else if (odds.nation !== "No" && odds.nation !== "NO"
      && odds.nation !== "Yes" && odds.nation !== "YES") {
      if (odds.nation === DRAW_MATCH) {
        hasOdds = true;
        theDraw = odds;
      } else if (teamA) {
        hasOdds = true;
        teamB = odds;
      } else {
        hasOdds = true;
        teamA = odds;
      }
    }
  });

  let teams = null;
  let tied = null;

  if (teamA && teamB) {
    teams = [
      {
        name: teamA.nation, backRate: teamA.backRate, backStake: teamA.backStake,
        layRate: teamA.layRate, layStake: teamA.layStake, status: teamA.status,
        marketId: teamA.marketId, userPosition: teamA.userPosition
      },
      {
        name: teamB.nation, backRate: teamB.backRate, backStake: teamB.backStake,
        layRate: teamB.layRate, layStake: teamB.layStake, status: teamB.status,
        marketId: teamB.marketId, userPosition: teamB.userPosition
      }
    ];

    if (theDraw) {
      teams.push({
        name: theDraw.nation, backRate: theDraw.backRate, backStake: theDraw.backStake,
        layRate: theDraw.layRate, layStake: theDraw.layStake, status: theDraw.status,
        marketId: theDraw.marketId, userPosition: theDraw.userPosition
      });
    }
  }

  if (tiedYes && tiedNo) {
    tied = [
      {
        name: tiedYes.nation, backRate: tiedYes.backRate, backStake: tiedYes.backStake,
        layRate: tiedYes.layRate, layStake: tiedYes.layStake, status: tiedYes.status,
        marketId: tiedYes.marketId, userPosition: tiedYes.userPosition
      },
      {
        name: tiedNo.nation, backRate: tiedNo.backRate, backStake: tiedNo.backStake,
        layRate: tiedNo.layRate, layStake: tiedNo.layStake, status: tiedNo.status,
        marketId: tiedNo.marketId, userPosition: tiedNo.userPosition
      }
    ];
  }

  // teams = [
  //   {
  //     name: "teamA.nation", backRate: 10, backStake: 20,
  //     layRate: 5, layStake: 15, status: "ACTIVE",
  //     marketId: "teamA.marketId", userPosition: 200
  //   },
  //   {
  //     name: "teamB.nation", backRate: 100, backStake: 200,
  //     layRate: 50, layStake: 150, status: "ACTIVE",
  //     marketId: "teamB.marketId", userPosition: 400
  //   }
  // ];

  return (
    <div className="market-section">
      <div className="market-header">
        
        <div className="market-title">
          
          {marketType}
          <span className="cash-out">CASH OUT</span>
        </div>

      </div>

      <div className="odds-table-container">

        <div className="odds-table">
        <div className="table-header">
        <div className="match-type-header" >Team</div>
            <div className="back-header">
              <div>Back</div>
            </div>
            <div className="lay-header">
              <div>Lay</div>
            </div>
        </div>
          {teams && teams.map((team, index) => (
            <div className="team-row">
              <div className="team-name">{team.name}</div>
              {/* <div className="odds-group"> */}
                <div key={`back-${index}`} className="odds-box back">
                  <span className="price">{team.backRate}</span>
                  <span className="amount">{team.backStake}K</span>
                </div>
              {/* </div> */}
              {/* <div className="odds-group"> */}
                <div key={`lay-${index}`} className="odds-box lay">
                  <span className="price">{team.layRate}</span>
                  <span className="amount">{team.layStake}K</span>
                </div>
              </div>
            // </div>
          ))}
          <div className="bet-limits">
            Min: {minBet} | Max: {maxBet}
          </div>
        </div>
      </div>
    </div>
  )
};

// Session Market Component
const SessionMarket = ({ oddsList, minBet, maxBet, waitTime }) => {
  let hasOdds = false;

  if (oddsList.length > 0)
    hasOdds = true;

  return (
    <div>
      {hasOdds && <div className="market-section">
        <div className="market-header">
          <div className="market-title">
            Session Market
          </div>
        </div>
        <div className="odds-table">
          <div className="table-header">
            <div className="match-type-header">Session</div>
            <div className="back-header">
              <div>No</div>
            </div>
            <div className="lay-header">
              <div>Yes</div>
            </div>
          </div>
          {oddsList.map((team, index) => (<div className="team-row">
            <div className="team-name">{team.marketName}</div>
            <div className="odds-box back">
              <span className="price">{team.noValue}</span>
              <span className="amount">{team.noRate}</span>
            </div>
            <div className="odds-box lay">
              <span className="price">{team.yesValue}</span>
              <span className="amount">{team.yesRate}</span>
            </div>
          </div>))}
          <div className="bet-limits">
            Min: {minBet} | Max: {maxBet}
          </div>
        </div>
      </div>}
    </div>
  )
}

// Ball By Ball Component
const BallByBallMarket = () => {
  <div className="market-section">
    <div className="market-header">
      <div className="market-title">Ball By Ball
        <FaCheck className="check-icon" />
      </div>

    </div>
    <div className="odds-table">
      <div className="table-header">
        <div>Ball</div>
        <div className="back-header">
          <div>Back</div>
          <div>Back</div>
        </div>
        <div className="lay-header">
          <div>Lay</div>
          <div>Lay</div>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">19.5 ball run ADKR</div>
        <div className="odds-box back">
          <span className="price">187</span>
          <span className="amount">250</span>
        </div>
        <div className="odds-box lay">
          <span className="price">187</span>
          <span className="amount">150</span>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">19.6 ball run ADKR</div>
        <div className="odds-box suspended">
          SUSPENDED
        </div>
      </div>
      <div className="bet-limits">
        Min: 100 | Max: 100K
      </div>
    </div>
  </div>
}

const MatchDetailsPage = ({ isLoggedIn, logOut }) => {
  const [selectedTab, setSelectedTab] = useState('scoreboard');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const { id } = useParams();
  const location = useLocation();

  const marketTypes = [
    { id: 'all', label: 'All' },
    { id: 'Session', label: 'Session Market' },
    { id: 'fancy', label: 'Fancy Market' },
    { id: 'ball', label: 'Ball By Ball' },
    { id: 'fancy1', label: 'Fancy 1' },
    { id: 'meter', label: 'Meter Market' },
    { id: 'khado', label: 'Khado Market' },
  ];

  const [matchResponse, setMatchResponse] = useState();
  const [fancyContainer, setFancyContainer] = useState();
  const [matchOddsContainer, setMatchOddsContainer] = useState();
  const [bookmakerOddsContainer, setBookmakerContainer] = useState();
  const [tossContainer, setTossContainer] = useState();
  const [betsForMatch, setBetsForMatch] = useState();
  const [preBetPreferenceData, setPreBetPreferenceData] = useState();

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const api = httpHelpers();
  const getOFBRates = "/gamma/getMatchById?matchId=" + id;
  const [matchDetails, setMatchDetails] = useState();
  const [videoLink, setVideoLink] = useState();

  const fetchMatchMarkets = async () => {
    api
      .get(`${getOFBRates}`)
      .then(res => {
        console.log("live markets", res);
        if (res && res.data) {
          if (res.data.matchResponse) {
            setMatchResponse(res.data.matchResponse);
            if (res.data.matchResponse.matchStatus === "LIVE" || res.data.matchResponse.matchStatus === "UPCOMING") {
              if (res.data.matchOddsContainer) {
                setMatchOddsContainer(res.data.matchOddsContainer);
              } else {
                setMatchOddsContainer(null);
              }
              if (res.data.bookMakerOddsContainer) {
                setBookmakerContainer(res.data.bookMakerOddsContainer);
              } else {
                setBookmakerContainer(null);
              }
              if (res.data.fancyContainer) {
                setFancyContainer(res.data.fancyContainer);
              } else {
                setFancyContainer(null);
              }
              if (res.data.matchScore && !matchDetails) {
                setMatchDetails(res.data.matchScore);
              }
              if (res.data.videoLink && !videoLink) {
                setVideoLink(res.data.videoLink);
              }
              if (res.data.tossContainer) {
                setTossContainer(res.data.tossContainer);
              } else {
                setTossContainer(null);
              }
              if (res.data.betsForMatch) {
                setBetsForMatch(res.data.betsForMatch);
              } else {
                setBetsForMatch(null);
              }
              if (res.data.preBetPreferenceData) {
                setPreBetPreferenceData(res.data.preBetPreferenceData);
              } else {
                setPreBetPreferenceData(null);
              }
            } else {
              setMatchOddsContainer(null);
              setBookmakerContainer(null);
              setFancyContainer(null);
              setMatchDetails(null);
              setTossContainer(null);
              setBetsForMatch(null);
              setPreBetPreferenceData(null);
            }
          } else {
            setMatchResponse(null);
          }

        }
      })
      .catch(err => {
        console.log("error error", err);
        if (err) {
          if (err.data) {
            if (err.data.status && err.data.status === 401) {
              logOut();
            }
          } else if (err.response) {
            if (err.response.status && err.response.status === 401) {
              logOut();
            }
          }
        }
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
    window.scrollTo(0, 0);
    fetchMatchMarkets();
    const intervalId = setInterval(() => {
      fetchMatchMarkets();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const renderMarketContent = () => {
    switch (selectedMarket) {
      case 'all':
        return (
          <div className="all-markets">
            {fancyContainer && fancyContainer.marketList && fancyContainer.marketList.length > 0 && <SessionMarket oddsList={fancyContainer.marketList} minBet={fancyContainer.minBet} maxBet={fancyContainer.maxBet} waitTime={fancyContainer.waitTime} />}
            <BallByBallMarket />
          </div>
        );
      case 'Session':
        return <div>{fancyContainer && fancyContainer.marketList && fancyContainer.marketList.length > 0 && <SessionMarket oddsList={fancyContainer.marketList} minBet={fancyContainer.minBet} maxBet={fancyContainer.maxBet} waitTime={fancyContainer.waitTime} />}</div>
      case 'ball':
        return <BallByBallMarket />;
      default:
        return null;
    }
  };

  return (
    <div className="match-details-container">
      <div className="mobile-tabs">
        <button
          className={`mobile-tab ${selectedTab === 'scoreboard' ? 'active' : ''}`}
          onClick={() => setSelectedTab('scoreboard')}
        >
          Scoreboard
        </button>
        <button
          className={`mobile-tab ${selectedTab === 'tv' ? 'active' : ''}`}
          onClick={() => setSelectedTab('tv')}
        >
          Live TV
        </button>
      </div>
     <div className="match-detail-container"> 
      {matchResponse && <div className="match-details-content" style = {{display:'flex',flexDirection:'column'}} >
        <div className={`match-details-main ${selectedTab === 'scoreboard' ? 'active' : ''}`}>
          
            <div className="graph-section" > 
              <div className="scrbrd-container" >
              <iframe style={{width:'100%',height:'100%',margin:'0 ',padding:'0'}} 
              // src="https://www.flashscore.com/match/1J1Q6Q8b" title="/" frameborder="0" scrolling="no"
                src={matchDetails}
                title={matchResponse && matchResponse.name}
             /> 
            </div>
            </div>
           </div>
          <div className={`live-tv-section ${selectedTab === 'tv' ? 'active' : ''}`}>
            <div className="tv-container">
              {/* <div className="live-tv-content"> */}
                  {videoLink ? (
                    <iframe  style={{width:'100%', height:'100%',margin:'0 ',padding:'0'}}
                      src={videoLink}
                      title="Live Stream"
                      className="live-stream-frame"
                      allowFullScreen
                    />
                  ) : (
                    <div className="no-stream-message">
                      <span>Live stream not available</span>
                    </div>
                  )}
                
              {/* </div> */}
            </div>
          </div>
        
        <div className="match-header">
              <div className="match-time">
                <span>{matchResponse.openDate}</span>
                <span className="status">{matchResponse.matchStatus}</span>
              </div>
              <div className="match-teams">
                <h1>{matchResponse.name}</h1>
              </div>
            </div>
      </div>
      }

      {tossContainer && tossContainer.marketList && tossContainer.marketList.length > 0 && <OddsMarket marketType={TOSS_ODDS} oddsList={tossContainer.marketList} minBet={tossContainer.minBet} maxBet={tossContainer.maxBet} waitTime={tossContainer.waitTime} />}
      {matchOddsContainer && matchOddsContainer.marketList && matchOddsContainer.marketList.length > 0 && <OddsMarket marketType={MATCH_ODDS} oddsList={matchOddsContainer.marketList} minBet={matchOddsContainer.minBet} maxBet={matchOddsContainer.maxBet} waitTime={matchOddsContainer.waitTime} />}
      {bookmakerOddsContainer && bookmakerOddsContainer.marketList && bookmakerOddsContainer.marketList.length > 0 && <OddsMarket marketType={BOOKMAKER} oddsList={bookmakerOddsContainer.marketList} minBet={bookmakerOddsContainer.minBet} maxBet={bookmakerOddsContainer.maxBet} waitTime={bookmakerOddsContainer.waitTime} />}

      <div className="markets-container">
        <div className="market-types-nav">
          {marketTypes.map(market => (
            <button
              key={market.id}
              className={`market-type-btn ${selectedMarket === market.id ? 'active' : ''}`}
              onClick={() => setSelectedMarket(market.id)}
            >
              {market.label}
            </button>
          ))}
        </div>

        <div className="market-content">
          {renderMarketContent()}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;