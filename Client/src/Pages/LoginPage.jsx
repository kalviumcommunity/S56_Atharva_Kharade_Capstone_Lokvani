import React, { useState, useContext } from 'react';
import './CSS/LoginPage.css';
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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../UserContext';
import { jwtDecode } from 'jwt-decode';

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

      console.log('Login response:', response.data);

      Cookies.set('token', response.data.token);

      const userDataResponse = await axios.get('https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails', {
        headers: {
          Authorization: response.data.token,
        },
      });

      console.log('User details response:', userDataResponse.data);

      const userDataImage = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/userDataImage/${userDataResponse.data.userId}`);

      console.log('User image response:', userDataImage.data);

      setUser(userDataResponse.data);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userImage', userDataImage.data.user?.Image || 'https://www.w3schools.com/howto/img_avatar.png');
      navigate('/User');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        if (error.response && error.response.data.error === 'User not found') {
          toast.error('User not found.');
        } else if (error.response && error.response.data.error === "Password doesn't match") {
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

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const { email } = decoded;
    // setUser(userDataResponse.data);
    try {
      const response = await axios.post(
        'https://s56-atharva-kharade-capstone-lokvani.onrender.com/GoogleLogin',
        { email: email }
      );
      console.log("Success:", response.data);
      Cookies.set('token', response.data.token);
      const userDataResponse = await axios.get('https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails', {
        headers: {
          Authorization: response.data.token,
        },
      });
      setUser(userDataResponse.data);

      const userDataImage = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/userDataImage/${userDataResponse.data.userId}`);

      console.log('User image response:', userDataImage.data);

      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userImage', userDataImage.data.user?.Image || 'https://www.w3schools.com/howto/img_avatar.png');
      navigate('/User');
    } catch (error) {
      console.error("Error:", error.response.data);
      toast.error(`${error.response.data.error}`);
    }
  }

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
            <input
              id="username-input"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={`input ${usernameError ? 'input-error' : ''}`}
              style={{
                fontSize: '20px',
                height: '50px',
                borderRadius: '6px',
                outline: 'none',
                width: '100%',
                padding: '0 10px',
              }}
            />
            {usernameError && (
              <span className="error-text">Username should be at least 4 characters long.</span>
            )}
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
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`input ${passwordError ? 'input-error' : ''}`}
                style={{
                  fontSize: "18px",
                  height: "50px",
                  borderRadius: "6px",
                  outline: 'none',
                  width: '100%',
                  padding: '0 40px 0 10px',
                }}
              />
              <IconButton
                onClick={handlePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '46%',
                  transform: 'translateY(-50%)',
                }}
              >
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
            </div>
            {passwordError && (
              <span className="error-text">Password must be at least 8 characters long.</span>
            )}
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
            <div className="custom-google-button">
              <GoogleOAuthProvider clientId="722611360376-mt0evhdhlt6jr55qmk92dumipmdg5khv.apps.googleusercontent.com">
                <GoogleLogin
                  text='continue_with'
                  theme='outline'
                  size='large'
                  shape='pill'
                  width='800px'
                  border='false'
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </GoogleOAuthProvider>
            </div>
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
