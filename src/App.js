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
      id: 1,
      name: 'IHS Imposter',
      icon: '🎭',
      color: '#6366F1',
    },
    {
      id: 2,
      name: 'Poly Market Project',
      icon: '📊',
      color: '#A78BFA',
    },
  ];

  return (
    <div className="App">
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'home' ? (
          <Home onNavigate={handleNavigate} />
        ) : currentPage === 'about' ? (
          <AllAboutMe />
        ) : currentPage === 'projects' ? (
          <Projects onNavigate={handleNavigate} />
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
