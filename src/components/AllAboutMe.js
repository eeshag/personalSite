import React, { useState, useEffect, useRef } from 'react';
import { aboutPage } from '../data/siteData';
import './AllAboutMe.css';

const AllAboutMe = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  const content = aboutPage.fullText;

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 100);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = Math.floor((scrollProgress / 100) * readingTime * 60);
  const totalTime = readingTime * 60;

  return (
    <div className="all-about-me" ref={contentRef}>
      <div className="banner-section">
        <div className="banner-content">
          <div className="cover-square">
            <span className="cover-icon">👤</span>
          </div>
          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">All About Me</h1>
            <p className="banner-metadata">Author: Eesha Gupta, {wordCount} words, {readingTime} minute read</p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="content-header">
          <div className="header-number">#</div>
          <div className="header-title">Title</div>
          <div className="header-date">Date added: {aboutPage.displayDate}</div>
        </div>
        <div className="header-divider"></div>

        <div className="writing-area">
          {content.split('\n\n').map((paragraph, index) => {
            const isFavorite = paragraph.startsWith('Favorite ');
            const paragraphClass = isFavorite
              ? 'content-paragraph favorite-paragraph'
              : 'content-paragraph';

            return (
              <div key={index} className="writing-row">
                <div className="row-number">{index + 1}</div>
                <div className="row-content">
                  <p className={paragraphClass}>{paragraph}</p>
                </div>
                <div className="row-date"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover">
            <span className="player-icon">👤</span>
          </div>
          <div className="player-info">
            <div className="player-title">All About Me</div>
            <div className="player-artist">Eesha Gupta</div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-progress-container">
            <div className="player-time player-time-left">{formatTime(currentTime)}</div>
            <div className="player-progress-bar">
              <div className="player-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <div className="player-time player-time-right">{formatTime(totalTime)}</div>
          </div>
        </div>

        <div className="player-right"></div>
      </div>
    </div>
  );
};

export default AllAboutMe;
