import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AllAboutMe from './components/AllAboutMe';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Photography from './components/Photography';
import ProjectDetail from './components/ProjectDetail';
import BlogDetail from './components/BlogDetail';
import PhotographyDetail from './components/PhotographyDetail';
import ConsumingDetail from './components/ConsumingDetail';
import ConsumingBrowse from './components/ConsumingBrowse';
import SearchResults from './components/SearchResults';
import SearchTopStrip from './components/SearchTopStrip';
import { blogs, photography, projects } from './data/siteData';
import { currentlyConsuming } from './data/content';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [searchFilter, setSearchFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  const blogSlugFromUrl = pathname.startsWith('/blogs/') && pathname.length > 7
    ? pathname.replace(/^\/blogs\//, '')
    : null;
  const blogFromUrl = blogSlugFromUrl
    ? blogs.find((blog) => blog.slug === blogSlugFromUrl)
    : null;
  const projectSlugFromUrl = pathname.startsWith('/projects/') && pathname.length > 10
    ? pathname.replace(/^\/projects\//, '')
    : null;
  const projectFromUrl = projectSlugFromUrl
    ? projects.find((project) => project.slug === projectSlugFromUrl)
    : null;
  const consumingSlugFromUrl = pathname.startsWith('/consuming/') && pathname.length > 11
    ? pathname.replace(/^\/consuming\//, '')
    : null;
  const consumingFromUrl = consumingSlugFromUrl
    ? currentlyConsuming.find((c) => c.slug === consumingSlugFromUrl)
    : null;

  const photoSlugFromUrl =
    pathname.startsWith('/photography/') && pathname.length > 12
      ? pathname.replace(/^\/photography\//, '')
      : null;
  const photoFromUrl = photoSlugFromUrl
    ? photography.find((p) => p.slug === photoSlugFromUrl)
    : null;

  const isOnBlogsList = pathname === '/blogs';
  const isOnBlogDetail = Boolean(blogFromUrl);
  const isOnAbout = pathname === '/about';
  const isOnProjectsList = pathname === '/projects';
  const isOnProjectDetail = Boolean(projectFromUrl);
  const isOnPhotographyList = pathname === '/photography';
  const isOnPhotographyDetail = Boolean(photoFromUrl);
  const isOnConsumingList = pathname === '/consuming';
  const isOnConsumingDetail = Boolean(consumingFromUrl);
  const isOnSearch = pathname.startsWith('/search');
  const searchQueryFromUrl = useMemo(() => {
    if (!pathname.startsWith('/search')) return '';
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [pathname, location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    setSearchFilter('all');
  }, [pathname, searchQueryFromUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectivePage =
    pathname === '/' ? 'home'
    : isOnAbout ? 'about'
    : isOnProjectsList ? 'projects'
    : isOnProjectDetail ? `project-${projectFromUrl.id}`
    : isOnBlogsList ? 'blogs'
    : isOnBlogDetail ? `blog-${blogFromUrl.id}`
    : isOnPhotographyList ? 'photography'
    : isOnPhotographyDetail ? `photo-${photoFromUrl.id}`
    : isOnConsumingList ? 'consuming'
    : isOnConsumingDetail ? `consuming-${consumingFromUrl.id}`
    : isOnSearch ? 'search'
    : currentPage;
  const effectiveBlog = isOnBlogDetail ? blogFromUrl : currentBlog;
  const effectiveProject = isOnProjectDetail ? projectFromUrl : currentProject;
  const effectiveConsuming = isOnConsumingDetail ? consumingFromUrl : null;
  const effectivePhoto = isOnPhotographyDetail ? photoFromUrl : currentPhoto;

  const handleNavigate = (page, payload = null) => {
    if (page === 'about') {
      navigate('/about');
      setCurrentPage('about');
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page === 'projects') {
      navigate('/projects');
      setCurrentPage('projects');
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page.startsWith('project-') && payload) {
      navigate(`/projects/${payload.slug}`);
      setCurrentPage(page);
      setCurrentProject(payload);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page === 'blogs') {
      navigate('/blogs');
      setCurrentPage('blogs');
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page === 'search' && payload && payload.query) {
      const trimmed = String(payload.query).trim();
      if (trimmed) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        setCurrentPage('search');
        setCurrentProject(null);
        setCurrentBlog(null);
        setCurrentPhoto(null);
        return;
      }
    }
    if (page.startsWith('blog-') && payload) {
      navigate(`/blogs/${payload.slug}`);
      setCurrentPage(page);
      setCurrentBlog(payload);
      setCurrentProject(null);
      setCurrentPhoto(null);
      return;
    }
    if (page === 'photography') {
      navigate('/photography');
      setCurrentPage('photography');
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page.startsWith('photo-') && payload) {
      navigate(`/photography/${payload.slug}`);
      setCurrentPage(page);
      setCurrentPhoto(payload);
      setCurrentProject(null);
      setCurrentBlog(null);
      return;
    }
    if (page === 'consuming') {
      navigate('/consuming');
      setCurrentPage('consuming');
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    if (page.startsWith('consuming-') && payload && payload.slug) {
      navigate(`/consuming/${payload.slug}`);
      setCurrentPage(page);
      setCurrentProject(null);
      setCurrentBlog(null);
      setCurrentPhoto(null);
      return;
    }
    setCurrentPage(page);
    if (page === 'home') {
      navigate('/');
    }
    setCurrentProject(null);
    setCurrentBlog(null);
    setCurrentPhoto(null);
  };

  return (
    <div className="App">
      <Sidebar currentPage={effectivePage} />
      <main className={`main-content main-content-with-search ${effectivePage === 'search' ? 'main-content-search-results' : ''}`}>
        {(!isMobile || effectivePage === 'search') && (
          <SearchTopStrip
            onNavigate={handleNavigate}
            initialQuery={effectivePage === 'search' ? searchQueryFromUrl : ''}
          />
        )}
        {effectivePage === 'home' ? (
          <Home onNavigate={handleNavigate} projects={projects} />
        ) : effectivePage === 'about' ? (
          <AllAboutMe />
        ) : effectivePage === 'projects' ? (
          <Projects onNavigate={handleNavigate} projects={projects} />
        ) : effectivePage === 'blogs' ? (
          <Blogs onNavigate={handleNavigate} />
        ) : effectivePage === 'photography' ? (
          <Photography />
        ) : effectivePage === 'search' ? (
          <SearchResults activeFilter={searchFilter} onFilterChange={setSearchFilter} />
        ) : effectivePage === 'consuming' ? (
          <ConsumingBrowse onNavigate={handleNavigate} />
        ) : effectivePage.startsWith('blog-') ? (
          <BlogDetail blog={effectiveBlog} onNavigate={handleNavigate} />
        ) : effectivePage.startsWith('photo-') ? (
          <PhotographyDetail photo={effectivePhoto} />
        ) : effectivePage.startsWith('project-') ? (
          <ProjectDetail
            project={effectiveProject || projects.find((project) => `project-${project.id}` === effectivePage)}
            onNavigate={handleNavigate}
          />
        ) : effectivePage.startsWith('consuming-') ? (
          <ConsumingDetail
            category={effectiveConsuming || currentlyConsuming.find((c) => `consuming-${c.id}` === effectivePage)}
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
