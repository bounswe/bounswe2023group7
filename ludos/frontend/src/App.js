import React from 'react';
import Layout from './layout'; // Make sure to import your Layout component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage'; // Import your LandingPage component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
