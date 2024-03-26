import React, { useState } from 'react';
import './SignUpPage.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import eyeIconVisible from '../Assets/visibility.png';
import eyeIconHidden from '../Assets/hide.png';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = () => {
        console.log(formData);
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
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { fontSize: '20px', marginTop: '-25px', height: '40px', borderRadius: '6px' }
                            }}
                        />
                        <InputLabel shrink htmlFor="lastName-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '10px' }}>
                            Last Name
                        </InputLabel>
                        <TextField
                            id="lastName-input"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            InputProps={{
                                style: { fontSize: '20px', marginTop: '-25px', height: '40px', borderRadius: '6px' }
                            }}
                        />
                        <InputLabel shrink htmlFor="username-input" style={{ fontSize: '25px', fontWeight: '400', color: '#000000', fontFamily: 'Poppins', marginTop: '10px' }}>
                            Username
                        </InputLabel>
                        <TextField
                            id="username-input"
                            name="username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.username}
                            onChange={handleInputChange}
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
                        <button className="Login-btn" onClick={handleLogin}>Sign Up</button>
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
