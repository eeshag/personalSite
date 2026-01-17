import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onNavigate, currentPage }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', color: '#6366F1' },
    { id: 'email', label: 'Email', icon: '✉️', color: '#A78BFA' },
    { id: 'youtube', label: 'YouTube', icon: '▶️', color: '#3B82F6' },
    { id: 'spotify', label: 'Spotify', icon: '🎼', color: '#7C3AED' },
    { id: 'about', label: 'All About Me', icon: '👤', color: '#9333EA' },
    { id: 'blogs', label: 'Blogs', icon: '📝', color: '#60A5FA' },
    { id: 'projects', label: 'Projects', icon: '💻', color: '#818CF8' },
  ];

  const handleIconClick = (id, url) => {
    if (id === 'home') {
      if (onNavigate) {
        onNavigate('home');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (id === 'email') {
      window.open('https://mail.google.com/mail/u/0/?fs=1&to=eeshag50@gmail.com&tf=cm', '_blank');
    } else if (id === 'youtube') {
      window.open('https://youtube.com/@incredgirl678?si=akOgxelHdVx3eZDz', '_blank');
    } else if (id === 'spotify') {
      window.open('https://open.spotify.com/user/312mixbngb3jlmrulyzl4lq3x6ui?si=57c245e47328410f', '_blank');
    } else if (id === 'about') {
      // Navigate to All About Me page
      if (onNavigate) {
        onNavigate('about');
      } else {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (id === 'blogs') {
      // Navigate to blogs page
      if (onNavigate) {
        onNavigate('blogs');
      }
    } else if (id === 'projects') {
      // Navigate to projects page
      if (onNavigate) {
        onNavigate('projects');
      } else {
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (url) {
      // Handle project URLs
      if (url.startsWith('#')) {
        const element = document.querySelector(url);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(url, '_blank');
      }
    }
  };

  return (
    <nav className="sidebar">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-icon ${currentPage === item.id ? 'active' : ''}`}
          style={{ backgroundColor: item.color }}
          onMouseEnter={() => setHoveredIcon(item.id)}
          onMouseLeave={() => setHoveredIcon(null)}
          onClick={() => handleIconClick(item.id)}
        >
          <span className="icon-emoji">{item.icon}</span>
          {hoveredIcon === item.id && (
            <div className="tooltip">
              <span className="tooltip-icon">{item.icon}</span>
              <span className="tooltip-label">{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;

