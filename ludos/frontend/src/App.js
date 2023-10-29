import HomePage from './pages/HomePage.js'
import GamePage from './pages/GamePage.js'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/game" element={<GamePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
