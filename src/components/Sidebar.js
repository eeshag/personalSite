import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ currentPage }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', color: '#6366F1', to: '/' },
    { id: 'email', label: 'Email', icon: '✉️', color: '#A78BFA', href: 'https://mail.google.com/mail/u/0/?fs=1&to=eeshag50@gmail.com&tf=cm', external: true },
    { id: 'youtube', label: 'YouTube', icon: '▶️', color: '#3B82F6', href: 'https://youtube.com/@incredgirl678?si=akOgxelHdVx3eZDz', external: true },
    { id: 'github', label: 'GitHub', icon: '🐙', color: '#6e5494', href: 'https://github.com/eeshag', external: true },
    { id: 'spotify', label: 'Spotify', icon: '🎼', color: '#7C3AED', href: 'https://open.spotify.com/user/312mixbngb3jlmrulyzl4lq3x6ui?si=57c245e47328410f', external: true },
    { id: 'about', label: 'All About Me', icon: '👤', color: '#9333EA', to: '/about' },
    { id: 'projects', label: 'Projects', icon: '💻', color: '#818CF8', to: '/projects' },
    { id: 'blogs', label: 'Blogs', icon: '📝', color: '#60A5FA', to: '/blogs' },
  ];

  const isItemActive = (item) => {
    if (currentPage === item.id) return true;
    if (item.id === 'projects' && currentPage.startsWith('project-')) return true;
    if (item.id === 'blogs' && currentPage.startsWith('blog-')) return true;
    return false;
  };

  const iconContent = (item) => (
    <>
      <span className="icon-emoji">{item.icon}</span>
      {hoveredIcon === item.id && (
        <div className="tooltip">
          <span className="tooltip-icon">{item.icon}</span>
          <span className="tooltip-label">{item.label}</span>
        </div>
      )}
    </>
  );

  const sharedProps = (item) => ({
    className: `sidebar-icon ${isItemActive(item) ? 'active' : ''}`,
    style: { backgroundColor: item.color },
    onMouseEnter: () => setHoveredIcon(item.id),
    onMouseLeave: () => setHoveredIcon(null),
  });

  return (
    <nav className="sidebar">
      {navItems.map((item) => {
        if (item.to) {
          return (
            <Link
              key={item.id}
              to={item.to}
              {...sharedProps(item)}
            >
              {iconContent(item)}
            </Link>
          );
        }
        if (item.external && item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              {...sharedProps(item)}
            >
              {iconContent(item)}
            </a>
          );
        }
        return null;
      })}
    </nav>
  );
};

export default Sidebar;

