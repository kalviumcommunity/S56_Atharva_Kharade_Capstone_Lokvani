import React, { useState } from 'react';
import './LoginPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    const usernameValue = event.target.value;
    setUsername(usernameValue);

    if (usernameValue.length < 4) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length > 0 && event.target.value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn('Please fill all input boxes.');
      return;
    }

    if (usernameError || passwordError) {
      toast.error('Please correct the errors before proceeding.');
      return;
    }

    try {
      const response = await axios.post(
        'https://s56-atharva-kharade-capstone-lokvani.onrender.com/login',
        { username, password }
      );

      console.log('Logged in as:', response.data);
      toast.success('Successfully logged in!');

      Cookies.set('username', username);
      Cookies.set('email', response.data.email);

      navigate('/User')
    } catch (error) {
      console.error('Error:', error.response.data.error);
      if (error.response.status === 401) {
        if (error.response.data.error === 'User not found') {
          toast.error('User not found.');
        } else if (error.response.data.error === 'Password doesn\'t match') {
          toast.error('Password doesn\'t match.');
        } else {
          toast.error('An error occurred while logging in.');
        }
      } else {
        toast.error('An error occurred while logging in.');
      }
    }
  };

  return (
    <div className="Login-main">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="Login-Img"></div>
      <div className="Login-Page">
        <div className="LoginPage-Body">
          <h1 id="Login-heading">LOGIN</h1>
          <p id="Login-para">
            Welcome Back! Join the conversation and <br />
            make a difference in your community.
          </p>
          <div className="input-box">
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
              error={usernameError}
              helperText={
                usernameError
                  ? 'Username should be at least 4 characters long.'
                  : ''
              }
              InputProps={{
                style: {
                  fontSize: '20px',
                  marginTop: '-25px',
                  height: '50px',
                  borderRadius: '6px',
                },
              }}
            />
            <InputLabel
              shrink
              htmlFor="password-input"
              style={{
                fontSize: "25px",
                fontWeight: "400",
                color: "#000000",
                fontFamily: "Poppins",
                marginTop: "20px",
              }}
            >
              Password
            </InputLabel>
            <TextField
              id="password-input"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={
                passwordError
                  ? "Password must be at least 8 characters long."
                  : ""
              }
              InputProps={{
                style: {
                  fontSize: "18px",
                  marginTop: "-20px",
                  height: "50px",
                  borderRadius: "6px",
                },
                endAdornment: (
                  <IconButton onClick={handlePasswordVisibility} edge="end">
                    <img
                      src={showPassword ? eyeIconVisible : eyeIconHidden}
                      alt={showPassword ? "Hide password" : "Show password"}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className="LoginPage-btn">
            <button className="Login-btn" onClick={handleLogin}>
              LOGIN
            </button>
          </div>
          <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '20px' }}>
            <p>OR</p>
          </div>
          <div>
            <div className="google-btn">
              <div className="google-img"></div>
              <div>
                <p>Sign-in with Google</p>
              </div>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>
                Don't have an account?
                <Link to={'/SignUp'}>
                  <u>Sign-Up</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
