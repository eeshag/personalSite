import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AllAboutMe from './components/AllAboutMe';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import ProjectDetail from './components/ProjectDetail';
import BlogDetail from './components/BlogDetail';
import SearchResults from './components/SearchResults';
import SearchTopStrip from './components/SearchTopStrip';
import { blogs } from './data/blogs';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [searchFilter, setSearchFilter] = useState('all');

  // Projects data (used for URL resolution and rendering). Slug = URL path from name (e.g. /projects/personal-website)
  const projects = [
    { id: 5, name: 'Personal Website', slug: 'personal-website', icon: '🤩', color: '#9E17AB', dateAdded: 'Dec 28, 2025' },
    { id: 1, name: 'IHS Imposter', slug: 'ihs-imposter', icon: '🎭', color: '#6366F1', dateAdded: 'Jan 7, 2026' },
    { id: 2, name: 'Poly Market Project', slug: 'poly-market-project', icon: '📊', color: '#A78BFA', dateAdded: 'Jan 22, 2026' },
    { id: 3, name: 'People vs. Pavement', slug: 'people-vs-pavement', icon: '🚗', color: '#D9C3F0', dateAdded: 'Feb 5, 2026' },
    { id: 4, name: 'Study Goblin', slug: 'study-goblin', icon: '🧌', color: '#7C9A6E', dateAdded: 'Feb 12, 2026' },
    { id: 6, name: 'Fair Lens', slug: 'fair-lens', icon: '🔎', color: '#06B6D4', dateAdded: 'Feb 19, 2026' },
  ];

  // Derive view from URL so direct links and back/forward work (blogs use slug, e.g. /blogs/cats)
  const blogSlugFromUrl = pathname.startsWith('/blogs/') && pathname.length > 7
    ? pathname.replace(/^\/blogs\//, '')
    : null;
  const blogFromUrl = blogSlugFromUrl
    ? blogs.find((b) => b.slug === blogSlugFromUrl)
    : null;
  const projectSlugFromUrl = pathname.startsWith('/projects/') && pathname.length > 10
    ? pathname.replace(/^\/projects\//, '')
    : null;
  const projectFromUrl = projectSlugFromUrl
    ? projects.find((p) => p.slug === projectSlugFromUrl)
    : null;

  const isOnBlogsList = pathname === '/blogs';
  const isOnBlogDetail = Boolean(blogFromUrl);
  const isOnAbout = pathname === '/about';
  const isOnProjectsList = pathname === '/projects';
  const isOnProjectDetail = Boolean(projectFromUrl);
  const isOnSearch = pathname.startsWith('/search');
  const searchQueryFromUrl = useMemo(() => {
    if (!pathname.startsWith('/search')) return '';
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [pathname, location.search]);

  // Scroll to top when navigating to a new page (no animation—start at top)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Reset search filter when leaving search page or when search query changes
  useEffect(() => {
    setSearchFilter('all');
  }, [pathname, searchQueryFromUrl]);

  const effectivePage =
    pathname === '/' ? 'home'
    : isOnAbout ? 'about'
    : isOnProjectsList ? 'projects'
    : isOnProjectDetail ? `project-${projectFromUrl.id}`
    : isOnBlogsList ? 'blogs'
    : isOnBlogDetail ? `blog-${blogFromUrl.id}`
    : isOnSearch ? 'search'
    : currentPage;
  const effectiveBlog = isOnBlogDetail ? blogFromUrl : currentBlog;
  const effectiveProject = isOnProjectDetail ? projectFromUrl : currentProject;

  const handleNavigate = (page, payload = null) => {
    if (page === 'about') {
      navigate('/about');
      setCurrentPage('about');
      setCurrentProject(null);
      setCurrentBlog(null);
      return;
    }
    if (page === 'projects') {
      navigate('/projects');
      setCurrentPage('projects');
      setCurrentProject(null);
      setCurrentBlog(null);
      return;
    }
    if (page.startsWith('project-') && payload) {
      navigate(`/projects/${payload.slug}`);
      setCurrentPage(page);
      setCurrentProject(payload);
      setCurrentBlog(null);
      return;
    }
    if (page === 'blogs') {
      navigate('/blogs');
      setCurrentPage('blogs');
      setCurrentProject(null);
      setCurrentBlog(null);
      return;
    }
    if (page === 'search' && payload && payload.query) {
      const trimmed = String(payload.query).trim();
      if (trimmed) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        setCurrentPage('search');
        setCurrentProject(null);
        setCurrentBlog(null);
        return;
      }
    }
    if (page.startsWith('blog-') && payload) {
      navigate(`/blogs/${payload.slug}`);
      setCurrentPage(page);
      setCurrentBlog(payload);
      setCurrentProject(null);
      return;
    }
    setCurrentPage(page);
    if (page === 'home') {
      navigate('/');
    }
    setCurrentProject(null);
    setCurrentBlog(null);
  };

  return (
    <div className="App">
      <Sidebar currentPage={effectivePage} />
      <main className={`main-content main-content-with-search ${effectivePage === 'search' ? 'main-content-search-results' : ''}`}>
        <SearchTopStrip
          onNavigate={handleNavigate}
          initialQuery={effectivePage === 'search' ? searchQueryFromUrl : ''}
        />
        {effectivePage === 'home' ? (
          <Home onNavigate={handleNavigate} projects={projects} />
        ) : effectivePage === 'about' ? (
          <AllAboutMe />
        ) : effectivePage === 'projects' ? (
          <Projects onNavigate={handleNavigate} projects={projects} />
        ) : effectivePage === 'blogs' ? (
          <Blogs onNavigate={handleNavigate} />
        ) : effectivePage === 'search' ? (
          <SearchResults
            projects={projects}
            blogs={blogs}
            activeFilter={searchFilter}
            onFilterChange={setSearchFilter}
          />
        ) : effectivePage.startsWith('blog-') ? (
          <BlogDetail blog={effectiveBlog} onNavigate={handleNavigate} />
        ) : effectivePage.startsWith('project-') ? (
          <ProjectDetail 
            project={effectiveProject || projects.find(p => `project-${p.id}` === effectivePage)} 
            onNavigate={handleNavigate}
          />
        ) : (
          <Home onNavigate={handleNavigate} projects={projects} />
        )}
      </main>
    </div>
  );
}

export default App;
