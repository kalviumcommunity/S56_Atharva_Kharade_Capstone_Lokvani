import React from 'react';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { Routes, Route } from 'react-router-dom';
import UserPage from './Pages/UserPage';

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<LandingPage />} />
    //   <Route path="/Login" element={<LoginPage />} />
    //   <Route path="/SignUp" element={<SignUpPage />} />
    // </Routes>
    <UserPage />
  );
};

export default App;
