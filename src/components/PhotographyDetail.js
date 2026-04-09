import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import './Photography.css';

function paragraphWithOptionalLinks(text, paragraphIndex) {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const matches = [...text.matchAll(re)];
  if (matches.length === 0) {
    return text;
  }

  const parts = [];
  let last = 0;
  for (const match of matches) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    parts.push(
      <Link
        key={`${paragraphIndex}-${match.index}`}
        to={match[2]}
        className="content-inline-link"
      >
        {match[1]}
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

const PhotographyDetail = ({ photo }) => {
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

  const formatDate = (dateString) => {
    let date;
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]) - 1;
      const day = Number(isoMatch[3]);
      date = new Date(year, month, day);
    } else {
      date = new Date(dateString);
    }

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!photo) {
    return null;
  }

  const paragraphs = (photo.fullText || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const wordCount = paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 100));
  const galleryCount = Array.isArray(photo.gallery) ? photo.gallery.length : 0;
  const photoCount = galleryCount > 0 ? galleryCount : photo.image ? 1 : 0;

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const totalTime = readingTime * 60;
  const currentTime = Math.floor((scrollProgress / 100) * totalTime);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const bannerBackground = photo.image
    ? `linear-gradient(180deg, ${hexToRgba(photo.color, 0.35)} 0%, ${hexToRgba(photo.color, 0.55)} 100%), url(${photo.image}) center/cover no-repeat`
    : `linear-gradient(180deg, ${hexToRgba(photo.color, 0.4)} 0%, ${hexToRgba(photo.color, 0.6)} 100%)`;

  return (
    <div className="projects-page blog-detail-page" ref={contentRef}>
      <div className="banner-section" style={{ background: bannerBackground }}>
        <div className="banner-content">
          <div
            className={`cover-square${photo.image ? ' cover-square--photo' : ''}`}
            style={!photo.image ? { backgroundColor: photo.color } : undefined}
          >
            {photo.image ? (
              <img src={photo.image} alt="" className="cover-square-photo" />
            ) : (
              <span className="cover-icon">{photo.icon}</span>
            )}
          </div>

          <div className="banner-text">
            <p className="banner-metadata">Photo set</p>
            <h1 className="banner-title">{photo.title}</h1>
            <p className="banner-metadata">
              {photoCount > 0
                ? `Eesha Gupta, ${photoCount} ${photoCount === 1 ? 'photo' : 'photos'}`
                : `Eesha Gupta, ${wordCount} words, ${readingTime} minute read`}
            </p>
          </div>
        </div>
      </div>

      <div className="content-section">
        {paragraphs.length > 0 ? (
          <>
            <div className="content-header">
              <div className="header-number">#</div>
              <div className="header-title">Notes</div>
              <div className="header-date">Date: {formatDate(photo.date)}</div>
            </div>
            <div className="header-divider"></div>

            <div className="writing-area">
              {paragraphs.map((text, index) => (
                <div
                  key={index}
                  className="writing-row"
                  style={{ paddingTop: index === 0 ? '0px' : '1px', paddingBottom: '0px' }}
                >
                  <div className="row-number">{index + 1}</div>
                  <div className="row-content">
                    <p className="content-paragraph" style={{ margin: '0' }}>
                      {paragraphWithOptionalLinks(text, index)}
                    </p>
                  </div>
                  <div className="row-date"></div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {Array.isArray(photo.gallery) && photo.gallery.length > 0 ? (
          <div
            className={
              'photography-detail-gallery' +
              (paragraphs.length === 0 ? ' photography-detail-gallery--no-notes' : '')
            }
          >
            {photo.gallery.map((src, index) => (
              <figure key={`${index}-${src}`} className="photography-detail-gallery-figure">
                <img
                  src={src}
                  alt={`${photo.title} ${index + 1}`}
                  className="photography-detail-gallery-image"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : null}
      </div>

      <div className="player-bar">
        <div className="player-left">
          <div
            className={`player-cover${photo.image ? ' player-cover--photo' : ''}`}
            style={!photo.image ? { backgroundColor: photo.color } : undefined}
          >
            {photo.image ? (
              <img src={photo.image} alt="" className="player-cover-photo" />
            ) : (
              <span className="player-icon">{photo.icon}</span>
            )}
          </div>
          <div className="player-info">
            <div className="player-title">{photo.title}</div>
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

export default PhotographyDetail;
