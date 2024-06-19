import './CSS/ProfileEdit.css';
import React, { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import UserDashboard from '../Components/UserDashboard';
import { UserContext } from '../UserContext';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEdit = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserProfiles/${userId}`);
        setUsername(response.data.username);
        setEmail(response.data.email);
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

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (newUsername, newEmail) => {
    try {
      const response = await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserEdit/${userId}`, {
        username: newUsername,
        email: newEmail,
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
      setIsModalOpen(false);

      sessionStorage.setItem('username', response.data.username);

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to save profile changes:', err);

      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error === 'Username already taken') {
          toast.error('Username already taken. Please choose a different username.');
        } else if (err.response.data.error === 'Email already taken') {
          toast.error('Email already taken. Please choose a different email.');
        } else {
          toast.error('Failed to update profile. Please try again.');
        }
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    }
  };

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
              <MdEdit className='profilePerEditPen' onClick={handleEditClick} />
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
            <h1>Posts Made</h1>
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
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}>
          <h1 id="a">Edit Profile</h1>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={handleModalClose} variant="contained" sx={{ mr: 2 }}>
              Close
            </Button>
            <Button onClick={() => handleSave(username, email)} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ProfileEdit;
