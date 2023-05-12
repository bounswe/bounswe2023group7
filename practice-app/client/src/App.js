import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage.js';
import Elif from './pages/elif/elif.js';
import Yunus from './pages/yunus/yunus.js';
import Safak from './pages/safak/safak.js';
import Melih from './pages/melih/melih.js';
import Tayyip from './pages/tayyip/tayyip.js';
import Event from './pages/furkan/event.js';
import CreateEvent from './pages/furkan/createEvent.js';
import ListEvent from './pages/furkan/listEvent.js';
import Sena from './pages/sena/sena.js';
import Hakan from './pages/hakan/hakan.js';
import Guney from './pages/guney/guney.js';
import Tuluyhan from './pages/tuluyhan/tuluyhan.js';
import Signin from './pages/signin.js';
import Signup from './pages/signup.js';
import Layout from './layout.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/elif" element={<Layout><Elif /></Layout>} />
          <Route path="/yunus" element={<Layout><Yunus /></Layout>} />
          <Route path="/safak" element={<Layout><Safak /></Layout>} />
          <Route path="/melih" element={<Layout><Melih /></Layout>} />
          <Route path="/tayyip" element={<Layout><Tayyip /></Layout>} />
          <Route path="/event" element={<Layout><Event /></Layout>} />
          <Route path="/event/createEvent" element={<Layout><CreateEvent /></Layout>} />
          <Route path="/event/listEvent" element={<Layout><ListEvent /></Layout>} />
          <Route path="/sena" element={<Layout><Sena /></Layout>} />
          <Route path="/hakan" element={<Layout><Hakan /></Layout>} />
          <Route path="/guney" element={<Layout><Guney /></Layout>} />
          <Route path="/tuluyhan" element={<Layout><Tuluyhan /></Layout>} />
          <Route path="/signin" element={<Layout><Signin /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;