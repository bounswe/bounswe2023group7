
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
