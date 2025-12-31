import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AllAboutMe from './components/AllAboutMe';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="main-content">
        {currentPage === 'home' ? (
          <Home onNavigate={setCurrentPage} />
        ) : currentPage === 'about' ? (
          <AllAboutMe />
        ) : (
          <Home onNavigate={setCurrentPage} />
        )}
      </main>
    </div>
  );
}

export default App;
