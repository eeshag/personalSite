import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AllAboutMe from './components/AllAboutMe';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import ProjectDetail from './components/ProjectDetail';
import BlogDetail from './components/BlogDetail';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);

  const handleNavigate = (page, payload = null) => {
    setCurrentPage(page);
    if (page.startsWith('project-')) {
      setCurrentProject(payload);
      setCurrentBlog(null);
    } else if (page.startsWith('blog-')) {
      setCurrentBlog(payload);
      setCurrentProject(null);
    } else {
      setCurrentProject(null);
      setCurrentBlog(null);
    }
  };

  // Projects data (should match Projects.js)
  const projects = [
    {
      id: 5,
      name: 'Personal Website',
      icon: '🤩',
      color: '#9E17AB',
      dateAdded: 'Dec 28, 2025',
    },
    {
      id: 1,
      name: 'IHS Imposter',
      icon: '🎭',
      color: '#6366F1',
      dateAdded: 'Jan 7, 2026',
    },
    {
      id: 2,
      name: 'Poly Market Project',
      icon: '📊',
      color: '#A78BFA',
      dateAdded: 'Jan 22, 2026',
    },
    {
      id: 3,
      name: 'People vs. Pavement',
      icon: '🚗',
      color: '#D9C3F0',
      dateAdded: 'Feb 5, 2026',
    },
    {
      id: 4,
      name: 'Study Goblin',
      icon: '🧌',
      color: '#7C9A6E',
      dateAdded: 'Feb 12, 2026',
    },
    {
      id: 6,
      name: 'Fair Lens',
      icon: '🔎',
      color: '#06B6D4',
      dateAdded: 'Feb 19, 2026',
    },
  ];

  return (
    <div className="App">
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'home' ? (
          <Home onNavigate={handleNavigate} projects={projects} />
        ) : currentPage === 'about' ? (
          <AllAboutMe />
        ) : currentPage === 'projects' ? (
          <Projects onNavigate={handleNavigate} projects={projects} />
        ) : currentPage === 'blogs' ? (
          <Blogs onNavigate={handleNavigate} />
        ) : currentPage.startsWith('blog-') ? (
          <BlogDetail blog={currentBlog} onNavigate={handleNavigate} />
        ) : currentPage.startsWith('project-') ? (
          <ProjectDetail 
            project={currentProject || projects.find(p => `project-${p.id}` === currentPage)} 
            onNavigate={handleNavigate}
          />
        ) : (
          <Home onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default App;
