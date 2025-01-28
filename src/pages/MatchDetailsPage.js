import React, { useState } from 'react';
import { FaExchangeAlt, FaChartLine, FaLock, FaTv } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import './MatchDetailsPage.css';

const MatchDetailsPage = () => {
  const [selectedTab, setSelectedTab] = useState('scoreboard');
  const [selectedMarket, setSelectedMarket] = useState('all');
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const location = useLocation();
  
  const marketTypes = [
    { id: 'all', label: 'All' },
    { id: 'line', label: 'Line Market' },
    { id: 'fancy', label: 'Fancy Market' },
    { id: 'ball', label: 'Ball By Ball' },
    { id: 'fancy1', label: 'Fancy 1' },
    { id: 'meter', label: 'Meter Market' },
    { id: 'khado', label: 'Khado Market' },
  ];

  const matchData = location.state?.matchData || {
    time: "Loading...",
    status: "INPLAY",
    team1: "Team 1",
    team2: "Team 2",
    odds: [{
      back: [
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" }
      ],
      lay: [
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" },
        { price: "0.00", amount: "0K" }
      ]
    }],
    bookmaker: {
      team1: {
        back: { price: "0.00", amount: "0K" },
        lay: { price: "0.00", amount: "0K" }
      },
      team2: {
        back: { price: "0.00", amount: "0K" },
        lay: { price: "0.00", amount: "0K" }
      }
    }
  };

  const renderBookmakerSection = () => (
    <div className="market-section bookmaker-section">
      <div className="market-header">
        <div className="market-title">Bookmaker</div>
        <div className="market-actions">
          <button className="action-btn"><FaExchangeAlt /></button>
          <button className="action-btn"><FaChartLine /></button>
          <button className="action-btn"><FaLock /></button>
        </div>
      </div>
      <div className="odds-table">
        <div className="table-header">
          <div>Teams</div>
          <div>Back</div>
          <div>Lay</div>
        </div>
        <div className="team-row">
          <div className="team-name">Western Australia Women</div>
          <div className="odds-box suspended">
            SUSPENDED
          </div>
        </div>
        <div className="team-row">
          <div className="team-name">Victoria Women</div>
          <div className="odds-box back">
            <span className="price">40</span>
            <span className="amount">100K</span>
          </div>
          <div className="odds-box lay">
            <span className="price">45</span>
            <span className="amount">100K</span>
          </div>
        </div>
        <div className="bet-limits">
          Min: 100 | Max: 100,000
        </div>
      </div>
    </div>
  );

  return (
    <div className="match-details-container">
      {/* Mobile Tabs */}
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

      <div className="match-details-content">
        {/* Main Content - Show based on mobile tab selection */}
        <div className={`match-details-main ${selectedTab === 'scoreboard' ? 'active' : ''}`}>
          {/* Match Header */}
          <div className="match-header">
            <div className="match-time">
              <span>{matchData.time}</span>
              <span className="status">{matchData.status}</span>
            </div>
            <div className="match-teams">
              <h1>{matchData.team1} <span> </span> {matchData.team2}</h1>
            </div>
          </div>

          <div className="graph-section">
            <div className="graph-team">Victoria W vs Western Australia</div>
            <div className="graph-line">
              <div className="graph-dot" style={{ left: '60%' }}></div>
            </div>
            <div className="graph-team"></div>
          </div>

          {/* Market Type Navigation */}
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

          {/* Market Sections */}
          <div className="market-sections">
            {/* Match Odds Section */}
            <div className="market-section">
              <div className="market-header">
                <div className="market-title">
                  Match Odds
                  <span className="cash-out">CASH OUT</span>
                </div>
                <div className="market-actions">
                  <button className="action-btn"><FaExchangeAlt /></button>
                  <button className="action-btn"><FaChartLine /></button>
                  <button className="action-btn"><FaLock /></button>
                </div>
              </div>

              {/* Odds Table */}
              <div className="odds-table-container">
                <div className="odds-table">
                  <div className="table-header">
                    <div>Teams</div>
                    <div className="back-header">
                      <div>Back</div>
                      <div>Back</div>
                    </div>
                    <div className="lay-header">
                      <div>Lay</div>
                      <div>Lay</div>
                    </div>
                  </div>

                  {/* Team Rows */}
                  <div className="team-row">
                    <div className="team-name">{matchData.team1}</div>
                    <div className="odds-group">
                      {matchData.odds[0]?.back.slice(0, 2).map((odd, index) => (
                        <div key={`back-${index}`} className="odds-box back">
                          <span className="price">{odd.price}</span>
                          <span className="amount">{odd.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="odds-group">
                      {matchData.odds[0]?.lay.slice(0, 2).map((odd, index) => (
                        <div key={`lay-${index}`} className="odds-box lay">
                          <span className="price">{odd.price}</span>
                          <span className="amount">{odd.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {renderBookmakerSection()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live TV Section - Show based on mobile tab selection */}
        <div className={`live-tv-section ${selectedTab === 'tv' ? 'active' : ''}`}>
          <div className="live-tv-header">
            <FaTv className="tv-icon" />
            <span>Live TV</span>
          </div>
          <div className="live-tv-content">
            <div className="tv-placeholder">
              <FaTv className="large-tv-icon" />
              <p>Live streaming is available for this match</p>
              <button className="watch-live-btn">Watch Live</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage; 