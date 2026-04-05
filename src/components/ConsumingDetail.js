import React, { useEffect, useState, useRef } from 'react';
import './Projects.css';
import './ConsumingDetail.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const CONSUMING_COLORS = ['#FB7185', '#FFFFFF', '#EAB308', '#6366F1', '#F97316', '#A5B4FC'];

const ConsumingDetail = ({ category, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!category) {
    return (
      <div className="projects-page consuming-detail-page">
        <div className="consuming-empty-state">
          <p>Category not found.</p>
          {onNavigate && (
            <button type="button" className="consuming-back-btn" onClick={() => onNavigate('home')}>
              Back to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  const color = CONSUMING_COLORS[(category.id - 1) % CONSUMING_COLORS.length];
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const bannerBackground = `linear-gradient(180deg, ${hexToRgba(color, 0.4)} 0%, ${hexToRgba(color, 0.6)} 100%)`;
  const items = category.items || [];

  const wordCount = items.reduce((total, item) => {
    const titleWords = (item.title || '').split(/\s+/).filter(Boolean).length;
    const creatorWords = (item.creator || '').split(/\s+/).filter(Boolean).length;
    const noteWords = (item.note || '').split(/\s+/).filter(Boolean).length;
    return total + titleWords + creatorWords + noteWords;
  }, 0) || 1;
  const readingTime = Math.max(1, Math.ceil(wordCount / 100));
  const readingTimeSeconds = readingTime * 60;
  const currentTime = Math.floor((scrollProgress / 100) * readingTimeSeconds);
  const totalTime = readingTimeSeconds;
  const bannerMetadata = 'Eesha Gupta';

  return (
    <div className="projects-page consuming-detail-page" ref={contentRef}>
      <div className="banner-section" style={{ background: bannerBackground }}>
        <div className="banner-content">
          <div className="cover-square" style={{ backgroundColor: color }}>
            <span className="cover-icon">{category.cover}</span>
          </div>
          <div className="banner-text">
            <p className="banner-metadata">Currently Consuming</p>
            <h1 className="banner-title">{category.title}</h1>
            <p className="banner-metadata">{bannerMetadata}</p>
          </div>
        </div>
      </div>

      <div className="consuming-content-section">
        <div className="consuming-list-header">
          <span className="consuming-header-number">#</span>
          <span className="consuming-header-title">Title</span>
          <span className="consuming-header-creator">Creator</span>
          <span className="consuming-header-rating">Rating</span>
        </div>
        <div className="consuming-list-divider" />

        {items.length === 0 ? (
          <div className="consuming-empty-list">
            <span className="consuming-empty-icon">{category.cover}</span>
            <p className="consuming-empty-text">Nothing listed yet—check back soon.</p>
            <p className="consuming-empty-hint">I’ll add what I’m {category.subtitle?.toLowerCase() || 'consuming'} here.</p>
          </div>
        ) : (
          <ul className="consuming-list">
            {items.map((item, index) => (
              <li key={index} className="consuming-list-row">
                <span className="consuming-row-number">{index + 1}</span>
                <div className="consuming-row-main">
                  <span className="consuming-row-title">{item.title}</span>
                  {item.note && <p className="consuming-row-note">{item.note}</p>}
                </div>
                <span className="consuming-row-creator">{item.creator || '—'}</span>
                <span className="consuming-row-rating">{item.rating ? `★ ${item.rating}` : '—'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover" style={{ backgroundColor: color }}>
            <span className="player-icon">{category.cover}</span>
          </div>
          <div className="player-info">
            <div className="player-title">{category.title}</div>
            <div className="player-artist">{bannerMetadata}</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-progress-container">
            <div className="player-time player-time-left">{formatTime(currentTime)}</div>
            <div className="player-progress-bar">
              <div
                className="player-progress-fill"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="player-time player-time-right">{formatTime(totalTime)}</div>
          </div>
        </div>

        <div className="player-right">
          {/* Empty for now, can add controls later */}
        </div>
      </div>
    </div>
  );
};

export default ConsumingDetail;
