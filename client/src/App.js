import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<Chatpage/>}/>
        {/* Later: add routes for login, dashboard, etc */}
      </Routes>
    </Router>
  );
}

export default App;
// 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
// https://github.com/lakkadiabhigna/ReplateProject.git
