import React, { useState, useRef } from 'react';
import { currentlyConsuming } from '../data/content';
import { blogs } from '../data/siteData';
import './Home.css';

const formatBlogDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const quickLinkEmoji = {
  email: '✉️',
  youtube: '▶️',
  github: '🐙',
  spotify: '🎼',
  facebook: '📘',
  about: '👤',
};

const Home = ({ onNavigate, projects = [] }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  const timeoutRef = useRef(null);
  const blogsNewestFirst = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  const quickLinks = [
    { id: 'email', label: 'Email', url: 'https://mail.google.com/mail/u/0/?fs=1&to=eeshag50@gmail.com&tf=cm', color: '#A78BFA' },
    { id: 'youtube', label: 'YouTube', url: 'https://youtube.com/@incredgirl678?si=akOgxelHdVx3eZDz', color: '#3B82F6' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/eeshag', color: '#6e5494' },
    { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/user/312mixbngb3jlmrulyzl4lq3x6ui?si=57c245e47328410f', color: '#7C3AED' },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/eesha.gupta.222295', color: '#1877F2' },
    { id: 'about', label: 'All About Me', url: 'about', color: '#9333EA', isPage: true },
  ];

  const darkenColor = (hex, amount = 0.7) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.floor((num >> 16) * amount));
    const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * amount));
    const b = Math.max(0, Math.floor((num & 0x0000FF) * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

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
      onNavigate(link.url);
    } else if (link.url.startsWith('#')) {
      const element = document.querySelector(link.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link.url, link.url.startsWith('mailto:') ? '_self' : '_blank');
    }
  };

  const handleMouseEnter = (color) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredColor(color);
  };

  const handleMouseLeave = () => {
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
      <div className="home-header">
        <div className="header-icon-wrapper">
          <span className="header-icon">👧</span>
        </div>
        <div className="header-content">
          <h1 className="name-title">Eesha</h1>
          <p className="bio-text">Freshman from Fremont interested in Tech and ML</p>
        </div>
      </div>

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
              <span className="link-icon" style={{ backgroundColor: link.color }}>{quickLinkEmoji[link.id]}</span>
              <span className="link-label">{link.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="content-carousel-section">
        <h2 className="section-title">Projects</h2>
        <div className="carousel-container">
          <div className="carousel">
            {projects.map((project) => (
              <div
                key={project.id}
                className="carousel-item-wrapper carousel-item-clickable"
                onClick={() => onNavigate && onNavigate(`project-${project.id}`, project)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && onNavigate) {
                    event.preventDefault();
                    onNavigate(`project-${project.id}`, project);
                  }
                }}
              >
                <div className="carousel-card">
                  <div
                    className="carousel-card-cover"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}40 0%, rgba(0, 0, 0, 0.4) 100%)`
                    }}
                  >
                    {project.icon}
                  </div>
                </div>
                <div className="carousel-card-info">
                  <h3 className="carousel-card-title">{project.name}</h3>
                  <p className="carousel-card-author">{project.dateAdded}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-carousel-section">
        <h2 className="section-title">Blogs</h2>
        <div className="carousel-container">
          <div className="carousel">
            {blogsNewestFirst.map((blog) => (
              <div
                key={blog.id}
                className="carousel-item-wrapper carousel-item-clickable"
                onClick={() => onNavigate && onNavigate(`blog-${blog.id}`, blog)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && onNavigate) {
                    event.preventDefault();
                    onNavigate(`blog-${blog.id}`, blog);
                  }
                }}
              >
                <div className="carousel-card">
                  <div
                    className="carousel-card-cover"
                    style={{
                      background: `linear-gradient(135deg, ${blog.color}40 0%, rgba(0, 0, 0, 0.4) 100%)`
                    }}
                  >
                    {blog.icon}
                  </div>
                </div>
                <div className="carousel-card-info">
                  <h3 className="carousel-card-title">{blog.title}</h3>
                  <p className="carousel-card-author">{formatBlogDate(blog.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-carousel-section">
        <h2 className="section-title">Currently Consuming</h2>
        <div className="carousel-container">
          <div className="carousel">
            {currentlyConsuming.map((item, index) => {
              const consumingColors = ['#FB7185', '#FFFFFF', '#EAB308', '#6366F1', '#F97316', '#A5B4FC'];
              const color = consumingColors[index % consumingColors.length];
              const slug = item.slug || item.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
              return (
                <div
                  key={item.id}
                  className="carousel-item-wrapper carousel-item-clickable"
                  onClick={() => onNavigate && onNavigate(`consuming-${item.id}`, { ...item, slug })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if ((event.key === 'Enter' || event.key === ' ') && onNavigate) {
                      event.preventDefault();
                      onNavigate(`consuming-${item.id}`, { ...item, slug });
                    }
                  }}
                >
                  <div className="carousel-card">
                    <div
                      className="carousel-card-cover"
                      style={{
                        background: `linear-gradient(135deg, ${color}40 0%, rgba(0, 0, 0, 0.4) 100%)`
                      }}
                    >
                      {item.cover}
                    </div>
                  </div>
                  <div className="carousel-card-info">
                    <h3 className="carousel-card-title">{item.title}</h3>
                    {item.author && <p className="carousel-card-author">{item.author}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
