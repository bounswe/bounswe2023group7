import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage.js';
import Elif from './pages/elif/elif.js';
import GamePlatform from './pages/yunus/game_platform.js';
import SearchGameForPlatform from './pages/yunus/search_screen.js';
import ListGames from './pages/yunus/list_games.js';
import AddPlatform from './pages/yunus/add_platform.js';
import PlatformInfo from './pages/yunus/platform_info.js';
import Safak from './pages/safak/safak.js';
import Melih from './pages/melih/melih.js';
import Tayyip from './pages/tayyip/tayyip.js';
import Furkan from './pages/furkan/furkan.js';
import Sena from './pages/sena/sena.js';
import Hakan from './pages/hakan/hakan.js';
import Guney from './pages/guney/guney.js';
import Tuluyhan from './pages/tuluyhan/tuluyhan.js';
import Signin from './pages/signin.js';
import Signup from './pages/signup.js';
import Layout from './layout.js';
import { AuthContext } from './helpers/AuthContext';
function App() {
  const [authState, setAuthState] = useState({
    status: false
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/elif" element={<Layout><Elif /></Layout>} />
            <Route path="/game-platform" element={<Layout><GamePlatform /></Layout>} />
            <Route path="/safak" element={<Layout><Safak /></Layout>} />
            <Route path="/melih" element={<Layout><Melih /></Layout>} />
            <Route path="/tayyip" element={<Layout><Tayyip /></Layout>} />
            <Route path="/furkan" element={<Layout><Furkan /></Layout>} />
            <Route path="/sena" element={<Layout><Sena /></Layout>} />
            <Route path="/hakan" element={<Layout><Hakan /></Layout>} />
            <Route path="/guney" element={<Layout><Guney /></Layout>} />
            <Route path="/tuluyhan" element={<Layout><Tuluyhan /></Layout>} />
            <Route path="/signin" element={<Layout><Signin /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/game-platform/search" element={<Layout><SearchGameForPlatform /></Layout>} />
            <Route path="/game-platform/add_platforms" element={<Layout><AddPlatform /></Layout>} />
            <Route path="/game-platform/list_searched" element={<Layout><ListGames /></Layout>} />
            <Route path="/game-platform/platform_info" element={<Layout><PlatformInfo /></Layout>} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;