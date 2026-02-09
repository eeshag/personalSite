import React, { useState, useEffect, useRef } from 'react';
import './AllAboutMe.css';

const AllAboutMe = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);
  const content = `Hi, I'm Eesha, a freshman (class of 2029) from Fremont, California.

I hope this website reminds you of Spotify, because that's what it's based off of. I love listening to music on Spotify, so I decided to base my personal website off it.

On my website, you will find info to contact me, my socials, blogs and my different projects I have made or am working on, if you have any questions feel free to reach out to me through my email :)

Now, a bit about myself because this is an all about me page. As you can probably tell, I'm really into technology. I've been hooked ever since my brother taught me how to use google docs in first grade and I've loved coding ever since I touched scratch in second grade. With Covid, I spent more time coding projects, even sharing them along with tutorials on youtube, with my channel getting overall 30,000 views.

Over time, I started learning new coding languages and getting a better understanding of computer science concepts, doing competitions like ACSL (American computer science league) and of course I've done all the math competitions, Math Olympiad, Math Kangaroo, AMC 8 and AMC 10, and I plan to continue doing more in the future.

Outside of coding, I started learning more skills like working with AI and machine learning, and of course web design, one of my favorite hobbies. (You can see my work with these things on the project page haha)

Outside of technology, I like reading murder mystery and self help books, watching bollywood movies, listening to music, writing, photography, and running. My favorite self-help book is Atomic Habitats, it's the first self-help book I read and convinced me to read more. In the past, I definitely did not like movies, but after my parents made me watch some classics, I can definitely say I enjoy them a lot more now. Running is a new hobby I picked up this year, and even though I can question why I ever run while actually running, I wouldn't say it's too bad when you run with other people, and it's a good way to clear your head and the sense of accomplishment after makes it all worth it. In the future, I definitely want to get more experience using a professional camera, and try other hobbies.

Here are some of my favorites:

Favorite color - pink

Favorite animal - cats

Favorite fruit - mangos

Favorite food - tacos

Favorite dessert - pizacookie

Favorite Chocolate - Crunch Bars

Favorite subject - math

Favorite sport - track

Favorite sport to watch - F1, Cricket

Favorite place I've visited - New York City

Favorite music artist - Frank Ocean

Favorite song - Champagne Coast - Blood Orange

Thanks so much for reading, please explore the rest of the website :))`;

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

