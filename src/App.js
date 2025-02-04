import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterMenu from './components/FooterMenu';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SportPage from './pages/SportPage';
import InplayPage from './pages/InplayPage'; // Import the InplayPage
import CasinoPage from './pages/CasinoPage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setSidebarOpen(false); // Close sidebar when opening login
  };

  const closeLoginModal = () => setIsLoginOpen(false);

  useEffect(() => {
    document.title = 'Puntexch247 | Live Sports Betting';
  }, []);

  return (
    <Router>
      <div className="app">
        <Header 
          isLoginOpen={isLoginOpen}
          openLoginModal={openLoginModal}
          closeLoginModal={closeLoginModal}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports/:sportName" element={<SportPage />} />
          <Route path="/inplay" element={<InplayPage />} /> {/* Add the route for InplayPage */}
          <Route path="/casino" element={<CasinoPage />} /> {/* Add Casino route */}
          <Route path="/match/:id" element={<MatchDetailsPage />} />
        </Routes>
        <Footer />
        <FooterMenu openLoginModal={openLoginModal} />
        {isLoginOpen && <LoginPage closeLogin={closeLoginModal} />}
      </div>
    </Router>
  );
}
export default App;
