import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import UserPage from './Pages/UserPage';
import LogComplaint from './Pages/LogComplaint';
import ProfileEdit from './Pages/ProfileEdit';
import MyComplaints from './Pages/MyComplaints';
import CommunitiesPage from './Pages/CommunitiesPage';
import Community from './Pages/Community';
import AdminPage from './Pages/AdminPage';
import AdminLogin from './Pages/AdminLogin';
import CommentPage from './Pages/CommentPage';
import AdminComplaintPage from './Pages/AdminComplaintPage';
import Post from './Pages/Post';
import GooglePass from './Pages/GooglePass';
import ExplorePage from './Pages/ExplorePage';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Explore" element={<ExplorePage />} />
        <Route path="/User/*" element={<UserPage />} />
        <Route path="/GooglePassword" element={<GooglePass />} />
        <Route path="/Complaint" element={<LogComplaint />} />
        <Route path="/ProfileEdit" element={<ProfileEdit />} />
        <Route path="/MyComplaints" element={<MyComplaints />} />
        <Route path="/Communities" element={<CommunitiesPage />} />
        <Route path="/Community/:name" element={<Community />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/AdminComplaints" element={<AdminComplaintPage />} />
        <Route path="/comment/:id" element={<CommentPage />} />
        <Route path="/community/:name/posts/:id" element={<Post />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
