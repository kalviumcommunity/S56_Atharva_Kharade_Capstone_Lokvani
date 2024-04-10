import React from 'react'
import UserDashboard from '../Components/UserDashboard'
import MainPage from './MainPage'
import { Routes, Route } from 'react-router-dom';
import LogComplaint from './LogComplaint'
import ProfileEdit from './ProfileEdit'
import MyComplaints from './MyComplaints';
import CommunitiesPage from './CommunitiesPage';
import Community from './Community';

const UserPage = () => {
  return (
    <div className='DashBoard-main'>
      <UserDashboard />
      <MainPage />
      <Routes>
        <Route path="/User/Complaint" element={<LogComplaint />} />
        <Route path="/User/ProfileEdit" element={<ProfileEdit />} />
        <Route path="/User/MyComplaints" element={<MyComplaints />} />
        <Route path="/User/Communities" element={<CommunitiesPage />} />
        <Route path="/User/Community" element={<Community />} />
      </Routes>
    </div>
  )
}

export default UserPage
