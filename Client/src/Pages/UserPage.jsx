import React from 'react'
import UserDashboard from '../Components/UserDashboard'
import MainPage from './MainPage'
import { Routes, Route } from 'react-router-dom';
import LogComplaint from './LogComplaint'

const UserPage = () => {
  return (
    <div className='DashBoard-main'>
            <UserDashboard/>
      <Routes>
       <Route path="/User" element={<MainPage />} />
       <Route path="/Complaint" element={<LogComplaint />} />
     </Routes>
    </div>
  )
}

export default UserPage
