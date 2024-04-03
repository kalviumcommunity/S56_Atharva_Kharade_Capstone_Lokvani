import React from 'react';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import UserPage from './Pages/UserPage';
import LogComplaint from './Pages/LogComplaint';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/User/*" element={<UserPage />} />
      <Route path="/Complaint" element={<LogComplaint />} />
    </Routes>
  );
};

export default App;
