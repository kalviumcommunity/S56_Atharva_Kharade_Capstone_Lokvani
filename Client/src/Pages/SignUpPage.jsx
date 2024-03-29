import React, { useState } from "react";
import "./SignUpPage.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import eyeIconVisible from "../Assets/visibility.png";
import eyeIconHidden from "../Assets/hide.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
            const response = await axios.get(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/users"
            );

            const existingUserByEmail = response.data.find(
                (user) => user.email === email
            );
            if (existingUserByEmail) {
                toast.warning("User with this email already exists.");
                return;
            }

            const existingUserByUsername = response.data.find(
                (user) => user.username === username
            );
            if (existingUserByUsername) {
                toast.warning(
                    "Username already exists. Please choose a different Username."
                );
                return;
            }

            const signUpResponse = await axios.post(
                "https://s56-atharva-kharade-capstone-lokvani.onrender.com/users",
                { username, email, password }
            );
            console.log("Success:", signUpResponse.data);
            toast.success("User has been registered successfully.");
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while registering User.");
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
