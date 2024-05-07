import React, { useState, useEffect } from 'react';
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
import { MdOutlineEditOff, MdOutlineModeEdit } from "react-icons/md";

const GooglePass = () => {
    const [usernameEditable, setUsernameEditable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const navigate = useNavigate();

    const initialUsername = Cookies.get('username');

    useEffect(() => {
        setUsername(initialUsername);
    }, [initialUsername]);

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

    const handleEditUsername = () => {
        setUsernameEditable(!usernameEditable);
    };

    const handleSignUp = async () => {
        const email = Cookies.get('email');
        if (!username || !email || !password) {
            toast.warn("Please fill all input boxes.");
            return;
        }

        if (usernameError || passwordError) {
            toast.error("Please correct the errors before proceeding.");
            return;
        }

        try {
            const response = await axios.post(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/UsernameCheck",
                { email, password, username }
            );

            console.log("Success:", response.data);
            Cookies.set('username', username);
            navigate('/User');
        } catch (error) {
            if (error.response.status === 400) {
                if (error.response.data.error === "Email already exists!") {
                    toast.warning("Email already exists. Please log in instead.");
                } else if (error.response.data.error === "Username already exists! Please choose a different username.") {
                    toast.warning("Username already exists. Please choose a different username.");
                } else {
                    toast.error("An error occurred while registering User.");
                }
            } else {
                toast.error("An error occurred while registering User.");
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
                <div className="GoogleLoginPage-Body">
                    <div className="input-box">
                        <InputLabel
                            shrink
                            htmlFor="username-input"
                            style={{
                                fontSize: '35px',
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
                            disabled={!usernameEditable}
                            value={username}
                            onChange={handleUsernameChange}
                            error={usernameError}
                            placeholder="Enter your username"
                            helperText={
                                usernameError
                                    ? 'Username should be at least 4 characters long.'
                                    : ''
                            }
                            InputProps={{
                                style: {
                                    fontSize: '25px',
                                    marginTop: '-25px',
                                    height: '55px',
                                    borderRadius: '6px',
                                },
                                endAdornment: (
                                    <IconButton onClick={handleEditUsername} edge="end">
                                        {usernameEditable ? <MdOutlineModeEdit /> : <MdOutlineEditOff />}
                                    </IconButton>
                                )
                            }}
                        />

                    </div>
                    <InputLabel
                        shrink
                        htmlFor="password-input"
                        style={{
                            fontSize: "35px",
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
                                fontSize: "25px",
                                marginTop: "-20px",
                                height: "55px",
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
                    <div className="LoginPage-btn">
                        <button className="Login-btn" onClick={handleSignUp}>
                            Signup
                        </button>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GooglePass;
