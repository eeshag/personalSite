import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ currentPage }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', color: '#6366F1', to: '/' },
    { id: 'about', label: 'All About Me', icon: '👤', color: '#9333EA', to: '/about' },
    { id: 'projects', label: 'Projects', icon: '💻', color: '#818CF8', to: '/projects' },
    { id: 'blogs', label: 'Blogs', icon: '📝', color: '#60A5FA', to: '/blogs' },
    { id: 'photography', label: 'Photography', icon: '📷', color: '#A855F7', to: '/photography' },
    { id: 'consuming', label: 'Currently Consuming', icon: '🎧', color: '#06B6D4', to: '/consuming' },
    { id: 'search', label: 'Search', icon: '🔍', color: '#9CCAFF', to: '/search' },
  ];

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleNavItems = isMobile
    ? navItems.filter((item) =>
        ['home', 'about', 'projects', 'blogs', 'photography', 'consuming', 'search'].includes(item.id)
      )
    : navItems.filter((item) => item.id !== 'search');

  const isItemActive = (item) => {
    if (currentPage === item.id) return true;
    if (item.id === 'projects' && currentPage.startsWith('project-')) return true;
    if (item.id === 'blogs' && currentPage.startsWith('blog-')) return true;
    if (item.id === 'photography' && (currentPage === 'photography' || currentPage.startsWith('photo-'))) return true;
    if (item.id === 'consuming' && (currentPage === 'consuming' || currentPage.startsWith('consuming-'))) return true;
    return false;
  };

  const handleIconMouseEnter = useCallback((item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      left: rect.right + 12,
      top: rect.top + rect.height / 2,
    });
    setHoveredIcon(item.id);
  }, []);

  const iconContent = (item) => (
    <>
      <span className="icon-emoji">{item.icon}</span>
    </>
  );

  const sharedProps = (item) => ({
    className: `sidebar-icon ${item.id === 'search' ? 'sidebar-icon--search' : ''} ${isItemActive(item) ? 'active' : ''}`,
    style: { backgroundColor: item.color },
    onMouseEnter: (e) => handleIconMouseEnter(item, e),
    onMouseLeave: () => setHoveredIcon(null),
  });

  const tooltipItem = hoveredIcon && navItems.find((i) => i.id === hoveredIcon);
  const tooltipPortal = tooltipItem && typeof document !== 'undefined' && createPortal(
    <div
      className="tooltip tooltip--portal"
      style={{
        position: 'fixed',
        left: tooltipPosition.left,
        top: tooltipPosition.top,
        transform: 'translateY(-50%)',
      }}
    >
      <span className="tooltip-icon">{tooltipItem.icon}</span>
      <span className="tooltip-label">{tooltipItem.label}</span>
    </div>,
    document.body
  );

  return (
    <nav className="sidebar">
      {visibleNavItems.map((item) => {
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
      {tooltipPortal}
    </nav>
  );
};

export default Sidebar;

