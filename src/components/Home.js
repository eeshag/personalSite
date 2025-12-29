import React from 'react';
import { currentlyConsuming } from '../data/content';
import './Home.css';

const Home = () => {
  const quickLinks = [
    // First row
    { id: 'email', label: 'Email', icon: '✉️', url: 'mailto:your.email@example.com', color: '#A78BFA' },
    { id: 'youtube', label: 'YouTube', icon: '▶️', url: 'https://youtube.com', color: '#3B82F6' },
    { id: 'spotify', label: 'Spotify', icon: '🎼', url: 'https://spotify.com', color: '#7C3AED' },
    // Second row
    { id: 'blog', label: 'Blog', icon: '📝', url: '#blog-section', color: '#60A5FA' },
    { id: 'projects', label: 'Projects', icon: '💻', url: '#projects-section', color: '#818CF8' },
  ];

  const handleLinkClick = (url) => {
    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(url, url.startsWith('mailto:') ? '_self' : '_blank');
    }
  };

  return (
    <div className="home">
      {/* Header Section */}
      <div className="home-header">
        <div className="header-icon-wrapper">
          <span className="header-icon">👧</span>
        </div>
        <div className="header-content">
          <h1 className="name-title">Eesha</h1>
          <p className="bio-text">Freshman from Fremont interested in Tech and ML</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="quick-links-section">
        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link) => (
            <div
              key={link.id}
              className="quick-link-card"
              onClick={() => handleLinkClick(link.url)}
            >
              <span className="link-icon" style={{ backgroundColor: link.color }}>{link.icon}</span>
              <span className="link-label">{link.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Carousel Section */}
      <div className="content-carousel-section">
        <h2 className="section-title">Currently Consuming</h2>
        <div className="carousel-container">
          <div className="carousel">
            {currentlyConsuming.map((item) => (
              <div key={item.id} className="carousel-item-wrapper">
                <div className="carousel-card">
                  <div className="carousel-card-cover">{item.cover}</div>
                </div>
                <div className="carousel-card-info">
                  <h3 className="carousel-card-title">{item.title}</h3>
                  <p className="carousel-card-author">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

