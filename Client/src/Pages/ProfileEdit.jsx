import React from 'react'
import './CSS/ProfileEdit.css'
import { MdEdit } from "react-icons/md";
import UserDashboard from '../Components/UserDashboard'
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

const ProfileEdit = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserProfiles/${userId}`);
        setUsername(response.data.username);
        setEmail(response.data.email);
        console.log(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('User not found');
        } else {
          setError('An error occurred');
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div className='UserProfileEditBody'>
      <UserDashboard />
      <div className='profileEditMain'>
        <div className="profileImageDiv">
          <div className="profileImage">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" />
          </div>
          <div className="profileEditDetail">
            <div className="profileEditPersonal">
              <MdEdit className='profilePerEditPen' />
              <div className="profileEditName">
                <h6>UserName</h6>
                <h1>{username}</h1>
              </div>
              <div className="profileEditName">
                <h6>Email</h6>
                <h1>{email}</h1>
              </div>
            </div>
            <div className="profileEditBio">
              <MdEdit className='profileBioEditPen' />
              <h1>Bio</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet efficitur nulla. Aliquam mattis justo eros, ac malesuada ipsum varius id. Morbi in ligula venenatis, convallis erat a, placerat.</p>
            </div>
          </div>
        </div>
        <div className="profileEditComplaints">
          <div className="profileComplaintLiked">
            <h1>Liked Posts</h1>
            <div>
              <div className="profileLikedPost">
                <div className='profileLikedBox'>
                  <h1>Post Detail</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="profileComplaintCommented">
            <h1>Posts Made </h1>
            <div>
              <div className="profileLikedPost">
                <div className='profileLikedBox'>
                  <h1>Post Detail</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
