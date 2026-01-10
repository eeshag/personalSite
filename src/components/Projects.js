import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  
  // Projects list
  const projects = [
    {
      id: 1,
      name: 'IHS Imposter',
      icon: '🎭',
      color: '#6366F1',
    },
    {
      id: 2,
      name: 'Poly Market Project',
      icon: '📊',
      color: '#A78BFA',
    },
  ];

  const handleProjectClick = (project) => {
    if (onNavigate) {
      onNavigate(`project-${project.id}`, project);
    }
  };

  // Calculate approximate word count and reading time (based on projects)
  const wordCount = projects.length * 50; // Estimate words per project
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
    <div className="projects-page projects-list-page" ref={contentRef}>
      {/* Top Banner Section */}
      <div className="banner-section">
        <div className="banner-content">
          {/* Left Square Cover */}
          <div className="cover-square">
            <span className="cover-icon">💻</span>
          </div>
          
          {/* Right-Side Banner Text */}
          <div className="banner-text">
            <p className="banner-metadata">Public Article</p>
            <h1 className="banner-title">Projects</h1>
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
        
        {/* Projects List */}
        <div className="writing-area">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-row"
              onClick={() => handleProjectClick(project)}
              style={{ cursor: 'pointer' }}
            >
              <div className="row-number">{index + 1}</div>
              <div className="row-content">
                <div className="project-item">
                  <div className="project-thumbnail" style={{ backgroundColor: project.color }}>
                    <span className="project-icon">{project.icon}</span>
                  </div>
                  <div className="project-info">
                    <div className="project-title">{project.name}</div>
                  </div>
                </div>
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
            <span className="player-icon">💻</span>
          </div>
          <div className="player-info">
            <div className="player-title">Projects</div>
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

export default Projects;
