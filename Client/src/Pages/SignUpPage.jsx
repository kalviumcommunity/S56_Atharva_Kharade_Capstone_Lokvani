import React, { useState, useContext } from "react";
import "./CSS/SignUpPage.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import eyeIconVisible from "../Assets/visibility.png";
import eyeIconHidden from "../Assets/hide.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { UserContext } from '../UserContext';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
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

    const handleSignUp = async () => {
        if (!username || !email || !password) {
            toast.warn("Please fill all input boxes.");
            return;
        }

        if (emailError || usernameError || passwordError) {
            toast.error("Please correct the errors before proceeding.");
            return;
        }

        try {
            const response = await axios.post(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/Signup",
                { email, password, username }
            );

            toast.success(response.data.message);
            setStep(2); // Move to OTP step
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

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/verify-otp",
                { email, otp }
            );

            Cookies.set("token", response.data.token);

            const userDataResponse = await axios.get('https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails', {
                headers: {
                    Authorization: response.data.token,
                },
            });

            const userImage = userDataResponse.data.user?.Image || 'https://www.w3schools.com/howto/img_avatar.png';
            setUser(userDataResponse.data.userId);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userImage', userImage);
            navigate("/user");
            toast.success("OTP verified successfully.");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const { email, name } = decoded;

        try {
            const response = await axios.get(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/GoogleSignup",
                { params: { email } }
            );
            navigate("/GooglePassword");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="Signup-main">
            <div className="Signup-container">
                <div className="image-section">
                    <img
                        src="https://source.unsplash.com/featured/?abstract"
                        alt="Signup"
                    />
                </div>
                <div className="Signup-section">
                    <h2>Welcome!</h2>
                    <p>Signup to access your account</p>
                    {step === 1 ? (
                        <>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError}
                                helperText={emailError ? "Please enter a valid email address" : ""}
                            />
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={handleUsernameChange}
                                error={usernameError}
                                helperText={usernameError ? "Username must be at least 4 characters long" : ""}
                            />
                            <InputLabel>Password</InputLabel>
                            <div className="password-input-container">
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={passwordError}
                                    helperText={passwordError ? "Password must be at least 8 characters long" : ""}
                                />
                                <IconButton
                                    className="eye-icon"
                                    onClick={handlePasswordVisibility}
                                >
                                    <img
                                        src={showPassword ? eyeIconVisible : eyeIconHidden}
                                        alt="Toggle visibility"
                                    />
                                </IconButton>
                            </div>
                            <button className="Signup-btn" onClick={handleSignUp}>
                                Sign Up
                            </button>
                            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={() => toast.error("Login Failed")}
                                    cookiePolicy="single_host_origin"
                                />
                            </GoogleOAuthProvider>
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Enter OTP"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className="Signup-btn" onClick={handleVerifyOtp}>
                                Verify OTP
                            </button>
                        </>
                    )}
                    <div className="signup-link-container">
                        Already have an account?{" "}
                        <Link className="signup-link" to="/Login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUpPage;
