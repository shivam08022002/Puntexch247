import React from 'react';
import HomeCasino from '../components/HomeCasino';
import VirtualGames from '../components/VirtualGames';
import './HomePage.css';

const HomePage = ({ openLoginModal }) => {
  return (
    <div className="home-page">
      <div className="home-content">
        <VirtualGames openLoginModal={openLoginModal} />
        <HomeCasino openLoginModal={openLoginModal} />
      </div>
    </div>
  );
};

export default HomePage;