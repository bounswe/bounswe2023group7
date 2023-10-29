import HomePage from './pages/Homepage.js'
import GamePage from './pages/GamePage.js'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout.js'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Layout><HomePage/></Layout>} />
          <Route path="/game" element={<Layout><GamePage/></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
