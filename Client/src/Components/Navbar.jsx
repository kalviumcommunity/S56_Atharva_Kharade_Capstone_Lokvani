import React, { useEffect, useState } from 'react';
import './CSS/Nav.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = Cookies.get('username');
        setIsLoggedIn(!!username);
    }, []);

    return (
        <>
            <nav>
                <div className='logo'>
                    <div className="logoImg"></div>
                    <div>
                        <h1>LOKVANI</h1>
                    </div>
                </div>

                <div className="navList">
                    <h1>About</h1>
                    <h1>Features</h1>
                    {isLoggedIn ? (
                        <Link to={'/User'}><button className="getstart-btn" role="button">Get Started</button></Link>
                    ) : (
                        <>
                            <Link to={'/Login'}><button className="button-59" role="button">Login</button></Link>
                            <Link to={'/SignUp'}><button className="SignUp-btn" role="button">Sign Up</button></Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
