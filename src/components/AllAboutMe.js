import React, { useState, useEffect, useRef } from 'react';
import './AllAboutMe.css';

const AllAboutMe = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  // Placeholder content - can be replaced with actual content later
  const content = `Welcome to my personal space. This is where I share my thoughts, experiences, and journey through life.

I'm a freshman from Fremont with a deep interest in technology and machine learning. The intersection of these fields fascinates me, and I'm constantly exploring new ways to apply what I learn.

Throughout my journey, I've discovered that the best way to grow is through continuous learning and sharing. This page serves as a reflection of who I am, what I value, and where I'm heading.

Technology has always been a passion of mine. From building my first website to diving into machine learning algorithms, each project teaches me something new. I believe in the power of code to solve real-world problems and make a positive impact.

Beyond technology, I enjoy exploring various forms of media - books, music, podcasts, and more. These experiences shape my perspective and inspire my work.

This is just the beginning of my story. As I continue to learn and grow, I'll keep updating this space with new insights, projects, and reflections.`;

  // Calculate approximate word count and reading time
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 100); // Assuming 100 words per minute

  // Track scroll progress
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
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format time for progress display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = Math.floor((scrollProgress / 100) * readingTime * 60);
  const totalTime = readingTime * 60;

  return (
    <div className="all-about-me" ref={contentRef}>
      {/* Top Banner Section */}
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

      {/* Content Section */}
      <div className="content-section">
        {/* Header Row */}
        <div className="content-header">
          <div className="header-number">#</div>
          <div className="header-title">Title</div>
          <div className="header-date">Date added: Dec 30, 2025</div>
        </div>
        <div className="header-divider"></div>

        {/* Writing Area */}
        <div className="writing-area">
          {content.split('\n\n').map((paragraph, index) => (
            <div key={index} className="writing-row">
              <div className="row-number">{index + 1}</div>
              <div className="row-content">
                <p className="content-paragraph">{paragraph}</p>
              </div>
              <div className="row-date"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Bar */}
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
              <div 
                className="player-progress-fill" 
                style={{ width: `${scrollProgress}%` }}
              ></div>
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

export default AllAboutMe;

