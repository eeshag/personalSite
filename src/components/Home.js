import React, { useState, useRef } from 'react';
import { currentlyConsuming } from '../data/content';
import './Home.css';

const Home = ({ onNavigate }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  const timeoutRef = useRef(null);
  
  const quickLinks = [
    // First row
    { id: 'email', label: 'Email', icon: '✉️', url: 'https://mail.google.com/mail/u/0/?fs=1&to=eeshag50@gmail.com&tf=cm', color: '#A78BFA' },
    { id: 'youtube', label: 'YouTube', icon: '▶️', url: 'https://youtube.com/@incredgirl678?si=akOgxelHdVx3eZDz', color: '#3B82F6' },
    { id: 'spotify', label: 'Spotify', icon: '🎼', url: 'https://open.spotify.com/user/312mixbngb3jlmrulyzl4lq3x6ui?si=57c245e47328410f', color: '#7C3AED' },
    // Second row
    { id: 'about', label: 'All About Me', icon: '👤', url: 'about', color: '#9333EA', isPage: true },
    { id: 'blog', label: 'Blog', icon: '📝', url: '#blog-section', color: '#60A5FA' },
    { id: 'projects', label: 'Projects', icon: '💻', url: 'projects', color: '#818CF8', isPage: true },
  ];

  // Function to darken a hex color for subtle gradient
  const darkenColor = (hex, amount = 0.7) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.floor((num >> 16) * amount));
    const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * amount));
    const b = Math.max(0, Math.floor((num & 0x0000FF) * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Mix the hovered color with the default color for subtlety
  const mixColors = (color1, color2, ratio = 0.3) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    const r = Math.floor(r1 * ratio + r2 * (1 - ratio));
    const g = Math.floor(g1 * ratio + g2 * (1 - ratio));
    const b = Math.floor(b1 * ratio + b2 * (1 - ratio));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const defaultGradientColor = '#1a0f2e';
  const gradientTopColor = hoveredColor 
    ? mixColors(darkenColor(hoveredColor, 0.4), defaultGradientColor, 0.25)
    : defaultGradientColor;

  const handleLinkClick = (link) => {
    if (link.isPage && onNavigate) {
      // Navigate to a page
      onNavigate(link.url);
    } else if (link.url.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(link.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Open external link
      window.open(link.url, link.url.startsWith('mailto:') ? '_self' : '_blank');
    }
  };

  const handleMouseEnter = (color) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredColor(color);
  };

  const handleMouseLeave = () => {
    // Set a timeout to clear the color after 0.5 seconds
    timeoutRef.current = setTimeout(() => {
      setHoveredColor(null);
      timeoutRef.current = null;
    }, 500);
  };

  return (
    <div 
      className="home"
      style={{
        background: `linear-gradient(180deg, ${gradientTopColor} 0%, #0a0a0a 100%)`,
        transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
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
              onClick={() => handleLinkClick(link)}
              onMouseEnter={() => handleMouseEnter(link.color)}
              onMouseLeave={handleMouseLeave}
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
                  {item.author && <p className="carousel-card-author">{item.author}</p>}
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

