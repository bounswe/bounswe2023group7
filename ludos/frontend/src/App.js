import logo from './logo.svg';
import Homepage from './pages/Homepage.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<Homepage/>} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
