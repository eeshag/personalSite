import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AllAboutMe from './components/AllAboutMe';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);

  const handleNavigate = (page, project = null) => {
    setCurrentPage(page);
    setCurrentProject(project);
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
