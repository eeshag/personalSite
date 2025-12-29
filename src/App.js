import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main-content">
        <Home />
      </main>
    </div>
  );
}

export default App;
