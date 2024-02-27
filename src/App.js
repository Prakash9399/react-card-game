import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Level from './components/Level';
import { easyLevelImages, mediumLevelImages, hardLevelImages } from './components/Images';

const App = () => {
  return (
    <HashRouter>
      <div className="main-card">
        <Navbar />
        <Routes>
          {/* Since the same <Level> component is being rendered in 3 paths, we have to pass */}
          {/* a unique key so that they can be distingushed and re-mounted */}
          <Route path="/" element={<Home />} />
          <Route path="/easy" element={<Level key="1" images={easyLevelImages} mode="easy"/>} />
          <Route path="/medium" element={<Level key="2" images={mediumLevelImages} mode="medium"/>} />
          <Route path="/hard" element={<Level key="3" images={hardLevelImages} mode="hard"/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
