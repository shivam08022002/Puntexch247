import React, { useState, useEffect, useMemo } from 'react';
import './CasinoPage.css';
import { EvolutionArray } from '../data/Evolution';
import { Astar } from '../data/Astar';
import { SaGamingArray } from '../data/Sagaming';
import { JDBArray } from '../data/JDB';
import { jiliArray } from '../data/Jili';
import { PgsoftArray } from '../data/PgSoft';
import { RedTigerArray } from '../data/RedTiger';
import { SpribeArray } from '../data/Spribe';
import { V8Array } from '../data/V8';
import { Yeebet } from '../data/YeeBet';

const providerData = [
  { name: 'All', games: [] },
  { name: 'Evolution', games: EvolutionArray },
  { name: 'Astar', games: Astar },
  { name: 'SaGaming', games: SaGamingArray },
  { name: 'JDB', games: JDBArray },
  { name: 'Jili', games: jiliArray },
  { name: 'PgSoft', games: PgsoftArray },
  { name: 'RedTiger', games: RedTigerArray },
  { name: 'Spribe', games: SpribeArray },
  { name: 'V8', games: V8Array },
  { name: 'YeeBet', games: Yeebet }
];

// Populate 'All' category with all games
providerData[0].games = providerData.slice(1).flatMap(provider => provider.games);

const ITEMS_PER_PAGE = 30;

const CasinoPage = ({ currentSportName = "casino" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [displayedGames, setDisplayedGames] = useState([]);
  const [page, setPage] = useState(1);

  const banners = {
    casino: {
      title: "Live Casino",
      tagline: "Experience the Thrill of the Game",
      bgImage: "https://img.freepik.com/premium-photo/casino-elements_849688-1265.jpg",
    },
  };

  const currentBanner = banners[currentSportName] || banners.casino;

  const handleProviderClick = (providerName) => {
    setSelectedProvider(providerName);
    setPage(1);
    setSearchTerm('');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGames = useMemo(() => {
    const currentProviderGames = providerData.find(p => p.name === selectedProvider)?.games || [];
    return currentProviderGames.filter(game => 
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedProvider]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedGames(filteredGames.slice(startIndex, endIndex));
  }, [searchTerm, selectedProvider, page, filteredGames]);

  return (
    <div className="casino-page">
      <div
        className="casino-page-banner"
        style={{ backgroundImage: `url(${currentBanner.bgImage})` }}
      >
        <div className="banner-content">
          <div className="banner-text">
            <h1>{currentBanner.title}</h1>
            <p>{currentBanner.tagline}</p>
          </div>
        </div>
      </div>

      <div className="casino-controls">
        <div className="provider-buttons-container">
          <div className="provider-buttons">
            {providerData.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleProviderClick(provider.name)}
                className={`provider-button ${selectedProvider === provider.name ? 'active' : ''}`}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="casino-section">
        <div className="casino-grid">
          {displayedGames.map((game, index) => (
            <div
              key={game.id}
              className="casino-card"
            >
              <div className="casino-card-inner">
                <img src={game.img} alt={game.name} className="casino-game-img" />
                <div className="casino-overlay">
                  <h3>{game.name}</h3>
                  {game.currency && <p>{game.currency}</p>}
                  {game.data ? (
                    <a href={game.data} target="_blank" rel="noopener noreferrer">
                      <button className="play-button">Play Now</button>
                    </a>
                  ) : (
                    <button className="play-button" disabled>Play Now</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {displayedGames.length === 0 && <p className="no-games">No games found.</p>}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasinoPage;