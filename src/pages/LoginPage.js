import React from 'react';
import './LoginPage.css';

const LoginPage = ({ closeLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality to be implemented!');
  };

  return (
    <div className="modal-overlay">
      {/* <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div> */}
      {/* <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/sports-background.mp4" type="video/mp4" />
      </video> */}
      <div className="login-modal">
        <button className="close-btn" onClick={closeLogin}>
          &times;
        </button>
        <div className="login-banner">
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="Skyexch Logo"
            className="login-logo"
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
          />
          <div className="validation-code">
            <input
              type="text"
              placeholder="Validation Code"
              className="login-input-code"
              required
            />
            <span className="validation-number">0802</span>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
