import React, { useEffect, useState } from 'react';
import './CSS/Nav.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Squash as Hamburger } from 'hamburger-react';
import img from "./CSS/Logo.png";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <nav>
                <div className='logo'>
                    <img src={img} alt="logo" className="logoImg" />
                    <div>
                        <h1>LOKVANI</h1>
                    </div>
                </div>

                <div className={`navList ${isOpen ? 'open' : ''}`}>
                    {isLoggedIn ? (
                        <Link to={'/User'}><button className="getstart-btn" role="button">Get Started</button></Link>
                    ) : (
                        <>
                            <Link to={'/Login'}><button className="button-59" role="button">Login</button></Link>
                            <Link to={'/SignUp'}><button className="SignUp-btn" role="button">Sign Up</button></Link>
                        </>
                    )}
                </div>
                <div className="hamburger">
                    <Hamburger toggled={isOpen} toggle={setOpen} size={25} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
