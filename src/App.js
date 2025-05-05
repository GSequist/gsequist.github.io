import React, { useState } from 'react';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Projects from './components/Projects';
import './App.css';

function App() {
  const [showProjects, setShowProjects] = useState(false);
  
  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };
  
  return (
    <div className="app">
      <div className="container">
        {!showProjects ? (
          <>
            <Profile onShowProjects={toggleProjects} />
            <Experience />
          </>
        ) : (
          <Projects onBackClick={toggleProjects} />
        )}
      </div>
    </div>
  );
}

export default App;