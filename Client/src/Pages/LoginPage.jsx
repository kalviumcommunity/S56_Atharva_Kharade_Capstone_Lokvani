import React, { useState } from 'react';
import './LoginPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Login-main">
      <div className="Login-Img"></div>
      <div className="Login-Page">
        <div className="LoginPage-Body">
          <h1 id='Login-heading'>LOGIN</h1>
          <p id='Login-para'>Welcome Back! Join the conversation and <br />make a difference in your community.</p>
          <div className="input-box">
            <InputLabel shrink htmlFor="username-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '20px' }}>
              Username
            </InputLabel>
            <TextField 
              id="username-input" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
              InputProps={{ 
                style: { fontSize: '25px', marginTop: '-25px',height:'50px',borderRadius:'6px' }
              }}
            />
            <InputLabel shrink htmlFor="password-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '20px' }}>
              Password
            </InputLabel>
            <TextField 
              id="password-input" 
              variant="outlined" 
              type={showPassword ? 'text' : 'password'} 
              fullWidth 
              margin="normal" 
              InputProps={{ 
                style: { fontSize: '25px', marginTop: '-25px',height:'50px',borderRadius:'6px' }
              }}
            />
          </div>
          <div className="LoginPage-btn">
          <button class="Login-btn" role="button">LOGIN</button>
          </div>
          <div style={{ marginTop: '15px',textAlign: 'center',fontSize: '20px'}}>
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
              <p>Don't have an account? <Link to={'/SignUp'}><u>Sign-Up</u></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
