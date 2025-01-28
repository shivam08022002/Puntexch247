import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHome,  FaDice, FaUser, FaClock } from 'react-icons/fa';
// FaFutbol,
import './FooterMenu.css';

const FooterMenu = ({ openLoginModal }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/inplay', label: 'In Play', icon: <FaClock /> },
    // { path: '/sports', label: 'Sports', icon: <FaFutbol /> },
    { path: '/casino', label: 'Casino', icon: <FaDice /> },
    { 
      path: '#', 
      label: 'Profile', 
      icon: <FaUser />,
      onClick: (e) => {
        e.preventDefault();
        openLoginModal();
      }
    },
  ];

  return (
    <div className="footer-menu">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li className="menu-item" key={item.path}>
            <Link
              to={item.path}
              className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={item.onClick}
            >
              <div className="icon-box">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterMenu;
