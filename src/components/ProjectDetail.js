import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const ProjectDetail = ({ project, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  
  // Get project-specific content
  const getProjectContent = () => {
    if (!project) return [];
    
    if (project.id === 1 && project.name === 'IHS Imposter') {
      return [
        {
          type: 'paragraph',
          content: (
            <>
              Play the game: <a href="https://ihs-imposter.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>https://ihs-imposter.vercel.app/</a>
            </>
          ),
          wordCount: 3
        },
        {
          type: 'paragraph',
          content: 'IHS Imposter is a web-based multiplayer party game inspired by a popular game in my school right now, Imposter, but with my own twists.'
        },
        {
          type: 'header',
          content: 'Why I Made This Project'
        },
        {
          type: 'paragraph',
          content: 'I made this game for a few main reasons:'
        },
        {
          type: 'list',
          items: [
            'I wanted a fun project that people at my school could actually play',
            'I was interested in how multiplayer games work behind the scenes',
            'I wanted hands-on coding experience, especially with frontend + backend logic',
            'Imposter is mostly only a game that can be played in person, because you need to pass around one device for most existing apps, I wanted to create a version that could be played online',
            'I wanted to create something more personal, which is why I added the twist of making it school themed',
            'Making a game felt way more motivating than doing random practice problems.'
          ]
        },
        {
          type: 'header',
          content: 'How I Built It'
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>Frontend:</strong> React (web-based, works on desktop & mobile)
            </>
          ),
          wordCount: 10
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>Backend:</strong> Render (designed to support real-time updates)
            </>
          ),
          wordCount: 8
        },
        {
          type: 'paragraph',
          content: (
            <>
              <strong>UI Focus:</strong> Clean, school colors (#000096 + white)
            </>
          ),
          wordCount: 7
        },
        {
          type: 'paragraph',
          content: 'Key things I implemented:'
        },
        {
          type: 'list',
          items: [
            'Blue Among Us Character wearing viking hat on home screen (computer version), info page, and favicon (Blue fit the colors of the website, and my schools mascot is vikings, so it was another nice and cute touch)',
            'Game code system (unique code per game)',
            'Create Game & Join Game flows',
            'Player limits and validation',
            'Imposter role assignment',
            'Word + hint system',
            'Random turn order selection',
            'Voting System'
          ]
        },
        {
          type: 'header',
          content: 'How the Game Works'
        },
        {
          type: 'paragraph',
          content: 'A host creates a game and chooses:'
        },
        {
          type: 'list',
          items: [
            'Number of players (3–12)',
            'Number of imposters'
          ]
        },
        {
          type: 'paragraph',
          content: 'Players join using a game code'
        },
        {
          type: 'paragraph',
          content: 'Once the lobby is full:'
        },
        {
          type: 'list',
          items: [
            'The host can start the game'
          ]
        },
        {
          type: 'paragraph',
          content: 'During gameplay:'
        },
        {
          type: 'list',
          items: [
            'Imposters see "Imposter" + a hint',
            'Other players see the secret word',
            'Everyone presses OK to continue',
            'Players are randomly chosen by the website to say words that describe the word (importers have to blend in and try to figure out the word)',
            'Once everyone has gone, people can vote on who the imposters are, and at the end the imposters are reveled'
          ]
        },
        {
          type: 'header',
          content: 'What I Learned'
        },
        {
          type: 'paragraph',
          content: 'This project helped me learn:'
        },
        {
          type: 'list',
          items: [
            'Creating backend for an app',
            'Managing game state across multiple users',
            'Thinking through edge cases (invalid codes, full games, etc.)',
            'Designing UI that works on both phones and computers'
          ]
        },
        {
          type: 'header',
          content: 'Future Plans'
        },
        {
          type: 'paragraph',
          content: 'Things I want to add next:'
        },
        {
          type: 'list',
          items: [
            'Timers for turns',
            'More words and categories',
            'Support for even more players',
            'Options for fellow vikings to send word and hint suggestions (could go sideways if it gets in the wrong hands haha)'
          ]
        }
      ];
    }
    
    // Default placeholder content for other projects
    return [
      {
        type: 'paragraph',
        content: `This is a detailed view of ${project.name}. Here you'll find comprehensive information about this project, including its purpose, technologies used, challenges overcome, and key achievements.`
      },
      {
        type: 'paragraph',
        content: `${project.name} represents a significant milestone in my development journey. Through this project, I've learned valuable lessons about building robust applications and solving complex problems.`
      },
      {
        type: 'paragraph',
        content: 'The project showcases various aspects of modern development practices and demonstrates my ability to work with different technologies and frameworks.'
      }
    ];
  };

  const projectContent = getProjectContent();
  
  // Calculate approximate word count and reading time
  const calculateWordCount = () => {
    let count = 0;
    projectContent.forEach(item => {
      if (item.type === 'paragraph') {
        if (typeof item.content === 'string') {
          count += item.content.split(/\s+/).length;
        } else if (item.wordCount !== undefined) {
          // Use explicit word count for React elements
          count += item.wordCount;
        } else {
          // Estimate word count for React elements by extracting text
          // This is a fallback - ideally each React element should have wordCount
          count += 10; // Default estimate
        }
      } else if (item.type === 'list') {
        item.items.forEach(itemText => {
          count += itemText.split(/\s+/).length;
        });
      } else if (item.type === 'header') {
        count += item.content.split(/\s+/).length;
      }
    });
    return count;
  };
  
  const wordCount = calculateWordCount();
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

  const bannerBackground = project.id === 3
    ? 'linear-gradient(180deg, rgba(217, 195, 240, 0.45) 0%, rgba(160, 132, 214, 0.7) 100%)'
    : `linear-gradient(180deg, ${hexToRgba(project.color, 0.4)} 0%, ${hexToRgba(project.color, 0.6)} 100%)`;

  return (
    <div className="projects-page" ref={contentRef}>
      {/* Top Banner Section */}
      <div className="banner-section" style={{ background: bannerBackground }}>
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
          <div className="header-date">Date added: Jan 19, 2026</div>
        </div>
        <div className="header-divider"></div>
        
        {/* Writing Area */}
        <div className="writing-area">
          {projectContent.map((item, index) => {
            // Determine if this is between sections or within a section
            const prevItem = index > 0 ? projectContent[index - 1] : null;
            const nextItem = index < projectContent.length - 1 ? projectContent[index + 1] : null;
            const isHeader = item.type === 'header';
            const isFirstInSection = prevItem && prevItem.type === 'header';
            const isLastInSection = nextItem && nextItem.type === 'header';
            
            // Spacing: more space before headers (between sections), minimal space within sections
            // First header has no extra top padding, subsequent headers have spacing
            const rowPaddingTop = isHeader 
              ? (index === 0 ? '0px' : '16px') 
              : (isFirstInSection ? '2px' : '1px');
            const rowPaddingBottom = isLastInSection ? '0px' : '0px';
            
            if (item.type === 'header') {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <h2 className="content-paragraph" style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '20px', marginTop: '0', marginBottom: '0' }}>
                      {item.content}
                    </h2>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            } else if (item.type === 'list') {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <ul style={{ margin: '0', paddingLeft: '24px', color: '#b3b3b3' }}>
                      {item.items.map((listItem, listIndex) => (
                        <li key={listIndex} className="content-paragraph" style={{ marginBottom: listIndex < item.items.length - 1 ? '2px' : '0' }}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            } else {
              return (
                <div key={index} className="writing-row" style={{ paddingTop: rowPaddingTop, paddingBottom: rowPaddingBottom }}>
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <p className="content-paragraph" style={{ margin: '0' }}>{item.content}</p>
                  </div>
                  <div className="row-date"></div>
                </div>
              );
            }
          })}
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
