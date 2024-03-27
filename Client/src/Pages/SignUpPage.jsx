import React, { useState } from 'react';
import './SignUpPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';
import axios from 'axios';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = async () => {
        const formData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password
        };

        try {
            const response = await axios.post('https://s56-atharva-kharade-capstone-lokvani.onrender.com/users', formData);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };




    return (
        <div className="Signup-main">
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
                            value={firstName}
                            onChange={handleFirstNameChange}
                            InputProps={{
                                style: { fontSize: '20px', marginTop: '-25px', height: '40px', borderRadius: '6px' }
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
                            value={lastName}
                            onChange={handleLastNameChange}
                            InputProps={{
                                style: { fontSize: '20px', marginTop: '-25px', height: '40px', borderRadius: '6px' }
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
                                style: { fontSize: '20px', marginTop: '-25px', height: '40px', borderRadius: '6px' }
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
                            InputProps={{
                                style: { fontSize: '25px', marginTop: '-25px', height: '40px', borderRadius: '6px' },
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
