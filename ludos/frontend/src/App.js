
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={
          <Layout>
            <SignUpForm />
          </Layout>
        }/>
        <Route path="/login" element={<Login />} />
      </Routes>ç
    </Router>
  );
}

export default App;
