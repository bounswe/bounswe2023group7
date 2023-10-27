import Homepage from './pages/HomePage.js'
import Gamepage from './pages/GamePage.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<Homepage/>} />
            <Route path="/game" element={<page/>} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
