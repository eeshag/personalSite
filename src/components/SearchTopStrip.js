import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTypeaheadSuggestions } from '../utils/siteSearch';
import './SearchTopStrip.css';

const baseUrl = import.meta.env.BASE_URL;

const SearchTopStrip = ({ onNavigate, initialQuery = '' }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) return;
      setIsOpen(false);
      setHighlightedIndex(-1);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => getTypeaheadSuggestions(searchQuery), [searchQuery]);

  const submitQuery = (value) => {
    const trimmed = String(value || '').trim();
    if (!trimmed) return;
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onNavigate) {
      onNavigate('search', { query: trimmed });
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (!suggestion) {
      submitQuery(searchQuery);
      return;
    }

    setSearchQuery(suggestion.value);
    setIsOpen(false);
    setHighlightedIndex(-1);

    if (suggestion.type === 'page' && suggestion.url) {
      navigate(suggestion.url);
      return;
    }

    submitQuery(suggestion.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const highlightedSuggestion = highlightedIndex >= 0 ? suggestions[highlightedIndex] : null;
    if (highlightedSuggestion) {
      handleSuggestionSelect(highlightedSuggestion);
      return;
    }
    submitQuery(searchQuery);
  };

  const handleKeyDown = (event) => {
    if (!suggestions.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((current) => (current + 1) % suggestions.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="search-top-strip">
      <div className="search-top-strip-band" aria-hidden="true" />
      <div className="search-top-strip-search-wrap" ref={containerRef}>
        <form className="search-top-strip-form" onSubmit={handleSubmit}>
          <div className={`search-top-strip-inner ${isOpen ? 'search-top-strip-inner-open' : ''}`}>
            <img
              src={`${baseUrl}eeshaLogo%20(4).png`}
              alt=""
              className="search-top-strip-icon"
              aria-hidden="true"
            />
            <input
              type="text"
              className="search-top-strip-input"
              placeholder="Search my site or ask a question about me (powered by GPT-5.1 nano)"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setIsOpen(true);
                setHighlightedIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              aria-label="Search my site or ask a question about me"
              autoComplete="off"
            />
            <button type="submit" className="search-top-strip-submit" aria-label="Search">
              <img
                src={`${baseUrl}eeshaLogo%20(5).png`}
                alt=""
                className="search-top-strip-submit-icon"
                aria-hidden="true"
              />
            </button>
          </div>
        </form>

        {isOpen && suggestions.length > 0 && (
          <div className="search-top-strip-dropdown" role="listbox" aria-label="Search suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                className={`search-top-strip-suggestion ${highlightedIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <span className="search-top-strip-suggestion-main">{suggestion.label}</span>
                <span className="search-top-strip-suggestion-meta">{suggestion.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTopStrip;
