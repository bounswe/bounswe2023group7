import ForumPage from "./pages/forumPage.js";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout.js";
import HomePage from "./pages/Homepage.js";
import GamePage from "./pages/GamePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignupPage.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/game"
            element={
              <Layout>
                <GamePage />
              </Layout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/forum"
            element={
              <Layout>
                <ForumPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
