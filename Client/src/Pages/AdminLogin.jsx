import React, { useState } from 'react';
import './CSS/LoginPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(emailValue));
    };

    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        setPasswordError(passwordValue.length < 8);
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://s56-atharva-kharade-capstone-lokvani.onrender.com/AdminLogin', { email, password });
            setLoading(false);
            localStorage.setItem('token', response.data);
            navigate('/Admin');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="AdminLogin-Page">
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
            <div className="Login-Page">
                <div className="LoginPage-Body">
                    <h1 id="Login-heading">ADMIN LOGIN</h1>
                    <div className="input-box">
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
                            error={emailError}
                            helperText={
                                emailError
                                    ? 'Invalid email format'
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
                        <div className="google-btn">
                            <div className="google-img"></div>
                            <div>
                                <p>Sign-in with Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
