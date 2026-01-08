import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const ProjectDetail = ({ project, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  
  // Sample content for the project - this would typically come from a data file
  const projectContent = project ? `
    This is a detailed view of ${project.name}. Here you'll find comprehensive information about this project, including its purpose, technologies used, challenges overcome, and key achievements.
    
    ${project.name} represents a significant milestone in my development journey. Through this project, I've learned valuable lessons about building robust applications and solving complex problems.
    
    The project showcases various aspects of modern development practices and demonstrates my ability to work with different technologies and frameworks.
  ` : '';

  // Calculate approximate word count and reading time
  const wordCount = projectContent.split(/\s+/).length;
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

  if (!project) {
    return null;
  }

  // Convert hex color to rgba for gradient
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="projects-page" ref={contentRef}>
      {/* Top Banner Section */}
      <div className="banner-section" style={{ background: `linear-gradient(180deg, ${hexToRgba(project.color, 0.4)} 0%, ${hexToRgba(project.color, 0.6)} 100%)` }}>
        <div className="banner-content">
          {/* Left Square Cover */}
          <div className="cover-square" style={{ backgroundColor: project.color }}>
            <span className="cover-icon">{project.icon}</span>
          </div>
          
          {/* Right-Side Banner Text */}
          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">{project.name}</h1>
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
          <div className="header-date">Date added: Jan 7, 2026</div>
        </div>
        <div className="header-divider"></div>
        
        {/* Writing Area */}
        <div className="writing-area">
          {projectContent.split('\n\n').map((paragraph, index) => (
            paragraph.trim() && (
              <div key={index} className="writing-row">
                <div className="row-number">{index + 1}</div>
                <div className="row-content">
                  <p className="content-paragraph">{paragraph.trim()}</p>
                </div>
                <div className="row-date"></div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Player Bar */}
      <div className="player-bar">
        <div className="player-left">
          <div className="player-cover" style={{ backgroundColor: project.color }}>
            <span className="player-icon">{project.icon}</span>
          </div>
          <div className="player-info">
            <div className="player-title">{project.name}</div>
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

export default ProjectDetail;
