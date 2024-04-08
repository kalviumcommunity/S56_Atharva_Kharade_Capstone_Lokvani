import React from 'react'
import UserDashboard from '../Components/UserDashboard'
import MainPage from './MainPage'
import { Routes, Route } from 'react-router-dom';
import LogComplaint from './LogComplaint'
import ProfileEdit from './ProfileEdit'
import MyComplaints from './MyComplaints';

const UserPage = () => {
  return (
    <div className='DashBoard-main'>
      <UserDashboard />
      <MainPage />
      <Routes>
        <Route path="/User/Complaint" element={<LogComplaint />} />
        <Route path="/User/ProfileEdit" element={<ProfileEdit />} />
        <Route path="/User/MyComplaints" element={<MyComplaints />} />
      </Routes>
    </div>
  )
}

export default UserPage
