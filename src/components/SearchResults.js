import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { currentlyConsuming } from '../data/content';
import { aboutMeSearchText, blogSearchTextById, getProjectSearchText } from '../data/searchIndex';
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
];

const SearchResults = ({ projects = [], blogs = [], activeFilter = 'all', onFilterChange }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';

  const normalizedQuery = initialQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return {
        projects: [],
        blogs: [],
        currentlyConsuming: [],
        showAboutMe: false,
      };
    }

    const matches = (text) =>
      typeof text === 'string' && text.toLowerCase().includes(normalizedQuery);

    const projectResults = projects.filter(
      (project) =>
        matches(project.name) ||
        matches(project.slug) ||
        (project.description && matches(project.description)) ||
        matches(getProjectSearchText(project.id, project.name))
    );

    const blogResults = blogs.filter(
      (blog) =>
        matches(blog.title) ||
        matches(blog.slug) ||
        matches(blog.excerpt) ||
        (blogSearchTextById[blog.id] && matches(blogSearchTextById[blog.id]))
    );

    const consumingResults = currentlyConsuming.filter(
      (item) => matches(item.title) || matches(item.author)
    );

    const showAboutMe = matches(aboutMeSearchText);

    return {
      projects: projectResults,
      blogs: blogResults,
      currentlyConsuming: consumingResults,
      showAboutMe,
    };
  }, [normalizedQuery, projects, blogs]);

  const hasQuery = normalizedQuery.length > 0;
  const hasResults =
    results.projects.length > 0 ||
    results.blogs.length > 0 ||
    results.currentlyConsuming.length > 0 ||
    results.showAboutMe;

  return (
    <div className="search-page">
      <div className="search-header" />

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
                        <div className="project-thumbnail" style={{ backgroundColor: '#9333EA' }}>
                          <span className="project-icon">👤</span>
                        </div>
                        <div className="project-info">
                          <div className="project-title">All About Me</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-date">Dec 30, 2025</div>
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
                    <Link
                      key={project.id}
                      to={`/projects/${project.slug}`}
                      className="project-row project-row-link"
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
                      <div className="row-date">{project.dateAdded || '—'}</div>
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
                    <Link
                      key={blog.id}
                      to={`/blogs/${blog.slug}`}
                      className="project-row project-row-link"
                    >
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

          {(activeFilter === 'all') && results.currentlyConsuming.length > 0 && (
            <div className="search-result-block">
              <h2 className="search-result-block-title">Currently Consuming</h2>
              <div className="content-section">
                <div className="content-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-date">Date added</div>
                </div>
                <div className="header-divider"></div>
                <div className="writing-area">
                  {results.currentlyConsuming.map((item, index) => (
                    <div key={item.id} className="project-row">
                      <div className="row-number">{index + 1}</div>
                      <div className="row-content">
                        <div className="project-item">
                          <div className="project-thumbnail search-result-consuming-thumb">
                            <span className="project-icon">{item.cover}</span>
                          </div>
                          <div className="project-info">
                            <div className="project-title">{item.title}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row-date">—</div>
                    </div>
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

