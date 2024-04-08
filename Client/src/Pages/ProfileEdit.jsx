import React, { useState, useEffect } from 'react';
import './CSS/ProfileEdit.css';
import UserDashboard from '../Components/UserDashboard';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { IconContext } from 'react-icons';
import { FaRegUserCircle } from 'react-icons/fa';

function ProfileEdit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    const storedEmail = Cookies.get('email');
    setUsername(storedUsername);
    setEmail(storedEmail);
    setUserNameInput(storedUsername || '');
    setEmailInput(storedEmail || '');
  }, []);

  const handleUsernameChange = (event) => {
    setUserNameInput(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint/${username}`, { newUsername: userNameInput, newEmail: emailInput });
      const { message, user } = response.data;
      toast.success(message);

      Cookies.set('username', userNameInput, { expires: 365 });
      Cookies.set('email', emailInput, { expires: 365 });
      
      setUsername(userNameInput);
      setEmail(emailInput);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error updating user");
        console.error("Error updating user:", error);
      }
    }
  };
  

  return (
    <div className='ProfileEdit-main'>
      <UserDashboard />
      <div className='ProfileEdit-body'>
        <div className="ProfileEdit-box">
          <div className="Profile-img">
            <IconContext.Provider value={{ color: 'black', size: '150px' }}>
              <FaRegUserCircle />
            </IconContext.Provider>
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
              value={userNameInput}
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
              value={emailInput}
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
            <button className='ProfileEdit-Cancel-btn'>Cancel</button>
            <button onClick={handleEditProfile} className='ProfileEdit-Edit-btn'>Edit</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileEdit;
