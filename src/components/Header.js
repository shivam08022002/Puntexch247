import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUser } from 'react-icons/fa';
import Navigation from './Navigation';
import Footer from './Footer';
import './Header.css';
import LoginPage from '../pages/LoginPage';
// Remove the logo import temporarily
// import logo from '../assets/logo.png';

const Header = ({ 
  isLoginOpen, 
  openLoginModal, 
  closeLoginModal, 
  isSidebarOpen, 
  setSidebarOpen 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <a href="/" className="logo">
          PUNTEXCH
        </a>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* Replace img with a div for now */}
          <div className="sidebar-logo-placeholder">P</div>
          <span className="sidebar-logo-text">PUNTEXCH</span>
          <button 
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <div className="sidebar-content">
          {/* Quick Access Menu */}
          <div className="sidebar-quick-menu">
            <a href="/" className="quick-menu-item">
              <FaHome className="quick-menu-icon" />
              <span>Home</span>
            </a>
            <button 
              className="quick-menu-item"
              onClick={openLoginModal}
            >
              <FaUser className="quick-menu-icon" />
              <span>Profile</span>
            </button>
          </div>
          <Navigation />
          <div className="sidebar-footer">
            <Footer />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      <div className="auth-buttons">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Sun (visible in light mode) */}
            <circle className="sun" cx="12" cy="12" r="5" />
            <g className="sun-rays">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
            {/* Moon (visible in dark mode) */}
            <path
              className="moon"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            />
          </svg>
        </button>

        <button className="login-btn" onClick={openLoginModal}>
          Login
        </button>
      </div>

      {isLoginOpen && <LoginPage closeLogin={closeLoginModal} />}
    </header>
  );
};

export default Header;
