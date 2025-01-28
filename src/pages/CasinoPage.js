import React from 'react';
import './CasinoPage.css';

const CasinoPage = ({ currentSportName = "casino" }) => {
  const banners = {
    casino: {
      title: "Live Casino",
      tagline: "Experience the Thrill of the Game",
      // background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
      bgImage:"https://img.freepik.com/premium-photo/casino-elements_849688-1265.jpg",
      // icon: "🎲",
    },
  };

  const casinoData = [
    {
      name: "Live Roulette",
      gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      game: "Evolution Gaming",
    },
    {
      name: "Teen Patti",
      gradient: "linear-gradient(135deg, #009688 0%, #4CAF50 100%)",
      game: "Live Teen Patti",
    },
    {
      name: "Blackjack",
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      game: "Live Blackjack",
    },
    {
      name: "Baccarat",
      gradient: "linear-gradient(135deg, #d4145a 0%, #fbb03b 100%)",
      game: "Live Baccarat",
    },
    {
      name: "Dragon Tiger",
      gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
      game: "Live Dragon Tiger",
    },
    {
      name: "Andar Bahar",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      game: "Live Andar Bahar",
    },
    {
      name: "Sic Bo",
      gradient: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
      game: "Live Sic Bo",
    },
    {
      name: "Poker",
      gradient: "linear-gradient(135deg, #20002c 0%, #cbb4d4 100%)",
      game: "Live Poker",
    },
    {
      name: "Fan Tan",
      gradient: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
      game: "Live Fan Tan",
    },
    {
      name: "Crazy Time",
      gradient: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
      game: "Live Crazy Time",
    },
    {
      name: "Mega Wheel",
      gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
      game: "Live Mega Wheel",
    },
    {
      name: "Lightning Dice",
      gradient: "linear-gradient(135deg, #f7ff00 0%, #db36a4 100%)",
      game: "Live Lightning Dice",
    },
  ];

  const currentBanner = banners[currentSportName] || banners.casino;

  return (
    <div className="casino-page">
      <div
        className="casino-page-banner"
        style={{
          backgroundImage: `url(${currentBanner.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="banner-content">
          <div className="banner-icon">{currentBanner.icon}</div>
          <div className="banner-text">
            {/* <h1>{currentBanner.title}</h1>
            <p>{currentBanner.tagline}</p> */}
          </div>
        </div>
      </div>
      <div className="casino-section">
        <div className="casino-grid">
          {casinoData.map((casino, index) => (
            <div key={index} className="casino-card">
              <div className="casino-card-inner">
                <div
                  className="casino-card-front"
                  style={{ background: casino.gradient }}
                >
                  <div className="casino-overlay">
                    <h3>{casino.name}</h3>
                    <p>{casino.game}</p>
                    <button className="play-button">Play Now</button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasinoPage;
