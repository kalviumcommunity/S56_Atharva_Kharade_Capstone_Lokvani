import React, { useState } from 'react';
import './SignUpPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        if (!/^[a-zA-Z]*$/.test(event.target.value)) {
            setFirstnameError(true);
        } else {
            setFirstnameError(false);
        }
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        if (!/^[a-zA-Z]*$/.test(event.target.value)) {
            setLastnameError(true);
        } else {
            setLastnameError(false);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length > 0 && event.target.value.length < 8) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handleSignUp = async () => {
        if (!username || !firstname || !lastname || !password) {
            toast.warn('Please fill all input boxes.');
            return;
        }

        if (firstnameError || lastnameError || passwordError) {
            toast.error('Please correct the errors before proceeding.');
            return;
        }

        try {
            const response = await axios.post('https://s56-atharva-kharade-capstone-lokvani.onrender.com/users', { username, firstname, lastname, password });
            console.log('Success:', response.data);
            toast.success('User has been registered successfully.');
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while registering User.');
        }
    };

    return (
        <div className="Signup-main">
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
            <div className="Signup-Img"></div>
            <div className="Signup-Page">
                <div className="Signup-Body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h1 id='Signup-heading'>Create an Account</h1>
                        <Link to={'/Login'}><p><u>Log-in instead</u></p></Link>
                    </div>

                    <div className="input-box">
                        <InputLabel shrink htmlFor="firstName-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '10px' }}>
                            First Name
                        </InputLabel>
                        <TextField
                            id="firstName-input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={firstname}
                            onChange={handleFirstNameChange}
                            error={firstnameError}
                            helperText={firstnameError ? 'First name should only contain letters.' : ''}
                            InputProps={{
                                style: { fontSize: '18px', marginTop: '-20px', height: '40px', borderRadius: '6px' }
                            }}
                        />
                        <InputLabel shrink htmlFor="lastName-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '10px' }}>
                            Last Name
                        </InputLabel>
                        <TextField
                            id="lastName-input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={lastname}
                            onChange={handleLastNameChange}
                            error={lastnameError}
                            helperText={lastnameError ? 'Last name should only contain letters.' : ''}
                            InputProps={{
                                style: { fontSize: '18px', marginTop: '-20px', height: '40px', borderRadius: '6px' }
                            }}
                        />
                        <InputLabel shrink htmlFor="username-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '10px' }}>
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
                                style: { fontSize: '18px', marginTop: '-20px', height: '40px', borderRadius: '6px' }
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
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText={passwordError ? 'Password must be at least 8 characters long.' : ''}
                            InputProps={{
                                style: { fontSize: '18px', marginTop: '-20px', height: '40px', borderRadius: '6px' },
                                endAdornment: (
                                    <IconButton onClick={handlePasswordVisibility} edge="end">
                                        <img
                                            src={showPassword ? eyeIconVisible : eyeIconHidden}
                                            alt={showPassword ? 'Hide password' : 'Show password'}
                                            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                        />
                                    </IconButton>
                                )
                            }}
                        />
                    </div>
                    <div className="LoginPage-btn">
                        <button className="Login-btn" onClick={handleSignUp}>Sign Up</button>
                    </div>
                    <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '20px' }}>
                        <p>OR</p>
                    </div>
                    <div>
                        <div className="google-btn">
                            <div className="google-img"></div>
                            <div>
                                <p>Sign-Up with Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
