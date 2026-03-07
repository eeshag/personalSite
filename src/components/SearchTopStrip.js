import React, { useState, useEffect } from 'react';
import './SearchTopStrip.css';

const SearchTopStrip = ({ onNavigate, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    if (onNavigate) {
      onNavigate('search', { query: trimmed });
    }
  };

  return (
    <div className="search-top-strip">
      <div className="search-top-strip-band" aria-hidden="true" />
      <div className="search-top-strip-search-wrap">
        <form className="search-top-strip-form" onSubmit={handleSubmit}>
          <div className="search-top-strip-inner">
            <img
            src={`${process.env.PUBLIC_URL || ''}/eeshaLogo%20(4).png`}
            alt=""
            className="search-top-strip-icon"
            aria-hidden="true"
          />
          <input
            type="text"
            className="search-top-strip-input"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search across projects, blogs, and more"
          />
          <button
            type="submit"
            className="search-top-strip-submit"
            aria-label="Search"
          >
            <img
              src={`${process.env.PUBLIC_URL || ''}/eeshaLogo%20(5).png`}
              alt=""
              className="search-top-strip-submit-icon"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default SearchTopStrip;
