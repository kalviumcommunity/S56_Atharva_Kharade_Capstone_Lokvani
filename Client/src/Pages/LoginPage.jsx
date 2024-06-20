import React, { useState, useEffect, useContext } from 'react';
import './CSS/LoginPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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
    if (!username || !password || usernameError || passwordError || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://s56-atharva-kharade-capstone-lokvani.onrender.com/login',
        { username, password }
      );


      Cookies.set('token', response.data.token);
      const userDataResponse = await axios.get('https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails', {
        headers: {
          Authorization: response.data.token,
        },
      });

      const userDataImage = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/userDataImage/${userDataResponse.data.userId}`);
      setUser(userDataResponse.data);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userImage', userDataImage.data.user.Image);
      navigate('/User');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      if (error.response.status === 401) {
        if (error.response.data.error === 'User not found') {
          toast.error('User not found.');
        } else if (error.response.data.error === "Password doesn't match") {
          toast.error("Password doesn't match.");
        } else {
          toast.error('An error occurred while logging in.');
        }
      } else {
        toast.error('An error occurred while logging in.');
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLoginSuccess = async (credentialResponse) => {
  //   const decoded = jwtDecode(credentialResponse.credential);

  //   const { email } = decoded;

  //   try {
  //     const response = await axios.post(
  //       'https://s56-atharva-kharade-capstone-lokvani.onrender.com/GoogleLogin',
  //       { email: email }
  //     );
  //     console.log("Success:", response.data);
  //     Cookies.set('token', response.data.token);
  //     navigate('/User');
  //   } catch (error) {
  //     console.error("Error:", error.response.data);
  //     toast.error(`${error.response.data.error}`);
  //   }
  // }

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
            <button className="Login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} color="inherit" />
                  <span style={{ marginLeft: '8px' }}>Logging in</span>
                </div>
              ) : (
                'LOGIN'
              )}
            </button>
          </div>
          <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '20px' }}>
            <p>OR</p>
          </div>
          <div>
            {/* <div className="google-login-button">
              <GoogleOAuthProvider clientId="722611360376-mt0evhdhlt6jr55qmk92dumipmdg5khv.apps.googleusercontent.com">
                <GoogleLogin
                  text='continue_with'
                  theme='outline'
                  size='large'
                  shape='pill'
                  width='800px'
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </GoogleOAuthProvider>
            </div> */}
            <div className='LoginPage-admin'>
              <div>
                <p>
                  Don't have an account?
                  <Link to={'/SignUp'}>
                    <u>Sign-Up</u>
                  </Link>
                </p>
              </div>
              <Link to={'/AdminLogin'}>
                <div className='LoginPage-Admin-Logo'>
                  <MdOutlineAdminPanelSettings className='Admin-logo' />
                  <h1>Admin</h1>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
