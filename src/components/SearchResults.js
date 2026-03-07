import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { currentlyConsuming } from '../data/content';
import './SearchResults.css';
import './Home.css';

const SearchResults = ({ projects = [], blogs = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const normalizedQuery = initialQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return {
        projects: [],
        blogs: [],
        currentlyConsuming: [],
      };
    }

    const matches = (text) =>
      typeof text === 'string' && text.toLowerCase().includes(normalizedQuery);

    const projectResults = projects.filter(
      (project) =>
        matches(project.name) ||
        matches(project.slug) ||
        matches(project.description)
    );

    const blogResults = blogs.filter(
      (blog) =>
        matches(blog.title) ||
        matches(blog.slug) ||
        matches(blog.excerpt)
    );

    const consumingResults = currentlyConsuming.filter(
      (item) => matches(item.title) || matches(item.author)
    );

    return {
      projects: projectResults,
      blogs: blogResults,
      currentlyConsuming: consumingResults,
    };
  }, [normalizedQuery, projects, blogs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  const hasQuery = normalizedQuery.length > 0;
  const hasResults =
    results.projects.length > 0 ||
    results.blogs.length > 0 ||
    results.currentlyConsuming.length > 0;

  return (
    <div className="search-page">
      <div className="search-header">
        <form className="home-search-bar" onSubmit={handleSubmit}>
          <div className="home-search-bar-inner">
            <span className="home-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className="home-search-input"
              placeholder="What do you want to play?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search across projects, blogs, and more"
            />
            <button
              type="submit"
              className="home-search-submit"
              aria-label="Search"
            >
              <span className="home-search-submit-icon">📁</span>
            </button>
          </div>
        </form>
        {hasQuery && (
          <p className="search-query-label">
            Showing results for <span className="search-query-text">{initialQuery}</span>
          </p>
        )}
      </div>

      {!hasQuery && (
        <div className="search-empty-state">
          <h2 className="search-empty-title">Search the site</h2>
          <p className="search-empty-description">
            Start typing above to find matching projects, blogs, and more.
          </p>
        </div>
      )}

      {hasQuery && !hasResults && (
        <div className="search-empty-state">
          <h2 className="search-empty-title">No results found</h2>
          <p className="search-empty-description">
            Try a different keyword or a more general phrase.
          </p>
        </div>
      )}

      {hasResults && (
        <div className="search-results-sections">
          {results.projects.length > 0 && (
            <section className="search-section">
              <h2 className="section-title">Projects</h2>
              <div className="search-grid">
                {results.projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="search-card search-card-link"
                  >
                    <div
                      className="search-card-icon-wrapper"
                      style={{ backgroundColor: project.color }}
                    >
                      <span className="search-card-icon">{project.icon}</span>
                    </div>
                    <div className="search-card-content">
                      <div className="search-card-title">{project.name}</div>
                      {project.dateAdded && (
                        <div className="search-card-meta">
                          Added {project.dateAdded}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.blogs.length > 0 && (
            <section className="search-section">
              <h2 className="section-title">Blogs</h2>
              <div className="search-grid">
                {results.blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blogs/${blog.slug}`}
                    className="search-card search-card-link"
                  >
                    <div
                      className="search-card-icon-wrapper"
                      style={{ backgroundColor: blog.color }}
                    >
                      <span className="search-card-icon">{blog.icon}</span>
                    </div>
                    <div className="search-card-content">
                      <div className="search-card-title">{blog.title}</div>
                      {blog.excerpt && (
                        <div className="search-card-meta">
                          {blog.excerpt}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.currentlyConsuming.length > 0 && (
            <section className="search-section">
              <h2 className="section-title">Currently Consuming</h2>
              <div className="search-grid">
                {results.currentlyConsuming.map((item) => (
                  <div key={item.id} className="search-card">
                    <div className="search-card-icon-wrapper search-card-icon-wrapper-muted">
                      <span className="search-card-icon">{item.cover}</span>
                    </div>
                    <div className="search-card-content">
                      <div className="search-card-title">{item.title}</div>
                      {item.author && (
                        <div className="search-card-meta">
                          {item.author}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

