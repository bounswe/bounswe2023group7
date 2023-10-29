import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layout"; // Make sure to import your Layout component
import LandingPage from "./pages/landingPage"; // Import your LandingPage component
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
