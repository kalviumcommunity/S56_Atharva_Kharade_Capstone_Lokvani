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
import { FaRegEdit } from "react-icons/fa";

const ProfileEdit = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [modalUsername, setModalUsername] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserProfiles/${userId}`);
        const userData = response.data;

        setUsername(userData.username);
        setEmail(userData.email);

        if (userData.Image) {
          setImageUrl(userData.Image);
        } else {
          setImageUrl("https://www.w3schools.com/howto/img_avatar.png");
        }

        console.log('User Profile:', userData);
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
    setModalUsername(username);
    setModalEmail(email);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);
    console.log('Form Data:', formData);

    try {
      const response = await axios.post(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/changeProfileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File upload successful:', response.data);
      setImageUrl(response.data.user.Image);
      toast.success('Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      toast.error('Failed to update profile image. Please try again.');
    }
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

  const handleLogoClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='UserProfileEditBody'>
      <UserDashboard />
      <div className='profileEditMain'>
        <div className="profileImageDiv">
          <div className="profileImage" onClick={() => document.getElementById('fileInput').click()}>
            <img src={imageUrl} alt="Profile" />
            <div className="profileImageEditLogoDiv">
              <label htmlFor="fileInput" className='profileImageEditLogo' onClick={handleLogoClick}>
                <FaRegEdit />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet efficitur nulla. Aliquam mattis justo eros, ac malesuada</p>
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
            value={modalUsername}
            onChange={(e) => setModalUsername(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            label="Email"
            value={modalEmail}
            onChange={(e) => setModalEmail(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={handleModalClose} variant="contained" sx={{ mr: 2 }}>
              Close
            </Button>
            <Button onClick={() => handleSave(modalUsername, modalEmail)} variant="contained" color="primary">
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
