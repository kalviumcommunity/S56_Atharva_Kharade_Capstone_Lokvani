import React from 'react';
import './Nav.css'
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                   <Link to={'/Login'}> <button className="button-59" role="button">Login</button></Link>
                   <Link to={'/SignUp'}><button className="SignUp-btn" role="button">Sign Up</button></Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
