import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', color: '#6366F1' },
    { id: 'email', label: 'Email', icon: '✉️', color: '#A78BFA' },
    { id: 'youtube', label: 'YouTube', icon: '▶️', color: '#3B82F6' },
    { id: 'spotify', label: 'Spotify', icon: '🎼', color: '#7C3AED' },
    { id: 'blog', label: 'Blog', icon: '📝', color: '#60A5FA' },
    { id: 'projects', label: 'Projects', icon: '💻', color: '#818CF8' },
  ];

  const handleIconClick = (id, url) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'email') {
      window.location.href = 'mailto:your.email@example.com';
    } else if (id === 'youtube') {
      window.open('https://youtube.com', '_blank');
    } else if (id === 'spotify') {
      window.open('https://spotify.com', '_blank');
    } else if (id === 'blog') {
      // Navigate to blog section or page
      const blogSection = document.getElementById('blog-section');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'projects') {
      // Navigate to projects section
      const projectsSection = document.getElementById('projects-section');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
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
          className="sidebar-icon"
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

