import React, { useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

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

            console.log("Success:", response.data);
            toast.success("User has been registered successfully.");
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

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);

        const { email, name } = decoded;
        try {
            const response = await axios.get(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/GoogleSignup",
                { params: { email } }
            );
            console.log("Success:", response.data);
            Cookies.set("username", name);
            Cookies.set("email", email);
            navigate("/GooglePassword");
        } catch (error) {
            console.error("Error:", error.response.data);
            toast.error(`${error.response.data.error}`);
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1 id="Signup-heading">Create an Account</h1>
                        <Link to={"/Login"}>
                            <p>
                                <u>Log-in instead</u>
                            </p>
                        </Link>
                    </div>

                    <div className="input-box">
                        <InputLabel
                            shrink
                            htmlFor="email-input"
                            style={{
                                fontSize: "25px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "10px",
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
                            helperText={emailError ? "Invalid email address." : ""}
                            InputProps={{
                                style: {
                                    fontSize: "18px",
                                    marginTop: "-20px",
                                    height: "50px",
                                    borderRadius: "6px",
                                },
                            }}
                        />

                        <InputLabel
                            shrink
                            htmlFor="username-input"
                            style={{
                                fontSize: "25px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "10px",
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
                                    ? "Username should be at least 4 characters long."
                                    : ""
                            }
                            InputProps={{
                                style: {
                                    fontSize: "18px",
                                    marginTop: "-20px",
                                    height: "50px",
                                    borderRadius: "6px",
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
                        <button className="Login-btn" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <div
                        style={{ marginTop: "15px", textAlign: "center", fontSize: "20px" }}
                    >
                        <p>OR</p>
                    </div>
                    <div>
                        <GoogleOAuthProvider clientId="722611360376-mt0evhdhlt6jr55qmk92dumipmdg5khv.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;