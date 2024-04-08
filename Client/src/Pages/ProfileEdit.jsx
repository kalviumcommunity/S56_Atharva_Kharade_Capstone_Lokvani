import React, { useState } from 'react';
import './CSS/ProfileEdit.css';
import UserDashboard from '../Components/UserDashboard';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileEdit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(`/Complaint/${username}`, { newUsername: username, newEmail: email });
      const { message, user } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className='ProfileEdit-main'>
      <UserDashboard />
      <div className='ProfileEdit-body'>
        <div className="ProfileEdit-box">
          <div className="Profile-img">
            {/* Display user image here */}
          </div>
          <div className="Profile-username">
            <InputLabel
              shrink
              htmlFor="username-input"
              style={{
                fontSize: '25px',
                fontWeight: '400',
                color: '#000000',
                fontFamily: 'Poppins',
                marginTop: '20px',
              }}
            >
              Username
            </InputLabel>
            <TextField
              id="username-input"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              InputProps={{
                style: {
                  fontSize: '20px',
                  marginTop: '-25px',
                  height: '50px',
                  borderRadius: '6px',
                },
              }}
            />
          </div>
          <div className="Profile-email">
            <InputLabel
              shrink
              htmlFor="email-input"
              style={{
                fontSize: '25px',
                fontWeight: '400',
                color: '#000000',
                fontFamily: 'Poppins',
                marginTop: '20px',
              }}
            >
              Email
            </InputLabel>
            <TextField
              id="email-input"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              InputProps={{
                style: {
                  fontSize: '20px',
                  marginTop: '-25px',
                  height: '50px',
                  borderRadius: '6px',
                },
              }}
            />
          </div>
          <div className="Profile-buttons">
            <button>Cancle</button>
            <button onClick={handleEditProfile}>Edit</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileEdit;
