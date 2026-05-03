import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchAnswerCard from './SearchAnswerCard';
import { aboutPage } from '../data/siteData';
import { getSearchResultGroups } from '../utils/siteSearch';
import './SearchResults.css';
import './Projects.css';
import './Home.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'photography', label: 'Photography' }
];

const SearchResults = ({ activeFilter = 'all', onFilterChange }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';
  const normalizedQuery = initialQuery.trim();

  const results = getSearchResultGroups(normalizedQuery, {
    currentPath: location.pathname,
    includeConsuming: true
  });

  const hasQuery = normalizedQuery.length > 0;
  const hasResults =
    results.projects.length > 0 ||
    results.blogs.length > 0 ||
    results.photography.length > 0 ||
    results.currentlyConsuming.length > 0 ||
    results.showAboutMe;

  return (
    <div className="search-page">
      <div className="search-header">
        {hasQuery && (
          <p className="search-query-label">
            Results for <span className="search-query-text">{normalizedQuery}</span>
          </p>
        )}
      </div>

      {hasQuery && <SearchAnswerCard query={normalizedQuery} currentPath={location.pathname} />}

      {!hasQuery && (
        <div className="search-empty-state">
          <h2 className="search-empty-title">Search the site</h2>
          <p className="search-empty-description">
            Ask a question about Eesha or search for projects, blogs, photography, and more.
          </p>
        </div>
      )}

      {hasQuery && !hasResults && (
        <div className="search-empty-state">
          <h2 className="search-empty-title">No documents found</h2>
          <p className="search-empty-description">
            Try a different keyword or a more general phrase. The AI answer above may still help.
          </p>
        </div>
      )}

      {hasResults && (
        <div className="search-results-sections search-results-list">
          <div className="search-results-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`search-results-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => onFilterChange && onFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {(activeFilter === 'all' || activeFilter === 'about') && results.showAboutMe && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">All About Me</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Date added</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  <Link to="/about" className="project-row project-row-link">
                    <div className="row-number">1</div>
                    <div className="row-content">
                      <div className="project-item">
                        <div className="project-thumbnail" style={{ backgroundColor: aboutPage.color }}>
                          <span className="project-icon">{aboutPage.icon}</span>
                        </div>
                        <div className="project-info">
                          <div className="project-title">{aboutPage.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-date">{aboutPage.displayDate}</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeFilter === 'about' && !results.showAboutMe && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">All About Me</h2>
              <div className="content-section">
                <p className="search-results-none">No results found.</p>
              </div>
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'projects') && results.projects.length > 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Projects</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Date added</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  {results.projects.map((project, index) => (
                    <Link key={project.id} to={project.url} className="project-row project-row-link">
                      <div className="row-number">{index + 1}</div>
                      <div className="row-content">
                        <div className="project-item">
                          <div className="project-thumbnail" style={{ backgroundColor: project.color }}>
                            <span className="project-icon">{project.icon}</span>
                          </div>
                          <div className="project-info">
                            <div className="project-title">{project.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row-date">{project.dateAdded || formatDate(project.date)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeFilter === 'projects' && results.projects.length === 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Projects</h2>
              <div className="content-section">
                <p className="search-results-none">No results found.</p>
              </div>
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'blogs') && results.blogs.length > 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Blogs</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Date added</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  {results.blogs.map((blog, index) => (
                    <Link key={blog.id} to={blog.url} className="project-row project-row-link">
                      <div className="row-number">{index + 1}</div>
                      <div className="row-content">
                        <div className="project-item">
                          <div className="project-thumbnail" style={{ backgroundColor: blog.color }}>
                            <span className="project-icon">{blog.icon}</span>
                          </div>
                          <div className="project-info">
                            <div className="project-title">{blog.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row-date">{formatDate(blog.date)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeFilter === 'blogs' && results.blogs.length === 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Blogs</h2>
              <div className="content-section">
                <p className="search-results-none">No results found.</p>
              </div>
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'photography') && results.photography.length > 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Photography</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Date added</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  {results.photography.map((photo, index) => (
                    <Link key={photo.id} to={photo.url} className="project-row project-row-link">
                      <div className="row-number">{index + 1}</div>
                      <div className="row-content">
                        <div className="project-item">
                          <div
                            className={`project-thumbnail${photo.image ? ' project-thumbnail--image' : ''}`}
                            style={!photo.image ? { backgroundColor: photo.color } : undefined}
                          >
                            {photo.image ? (
                              <img src={photo.image} alt="" className="cover-square-photo" />
                            ) : (
                              <span className="project-icon">{photo.icon}</span>
                            )}
                          </div>
                          <div className="project-info">
                            <div className="project-title">{photo.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row-date">{formatDate(photo.date)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeFilter === 'photography' && results.photography.length === 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Photography</h2>
              <div className="content-section">
                <p className="search-results-none">No results found.</p>
              </div>
            </div>
          )}

          {activeFilter === 'all' && results.currentlyConsuming.length > 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Currently Consuming</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Category</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  {results.currentlyConsuming.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/consuming/${item.slug || item.title?.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                      className="project-row project-row-link"
                    >
                      <div className="row-number">{index + 1}</div>
                      <div className="row-content">
                        <div className="project-item">
                          <div className="project-thumbnail search-result-consuming-thumb">
                            <span className="project-icon">{item.icon}</span>
                          </div>
                          <div className="project-info">
                            <div className="project-title">{item.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row-date">Media</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
