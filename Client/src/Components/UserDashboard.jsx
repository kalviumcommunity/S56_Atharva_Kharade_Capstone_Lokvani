import React from 'react';
import './CSS/UserDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { GrDocumentUser } from 'react-icons/gr';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBuildingNgo } from 'react-icons/fa6';
import { TbLogout } from 'react-icons/tb';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const navigate = useNavigate();
    let [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        handleUserDetails();
    }, []);

    const handleUserDetails = async () => {
        const token = Cookies.get("token");
        try {
          const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data);
          setEmail(response.data.email);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

    const maxEmailLength = 20;
    if (email && email.length > maxEmailLength) {
        email = email.slice(0, maxEmailLength) + '...';
    }

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    return (
        <>
            <div className="Sidenav">
                <div className="Sidenav1">
                    <div className="SideNav-logo">
                        <div className="logoSidenav"></div>
                        <div>
                            <h1>LOKVANI</h1>
                        </div>
                    </div>

                    <Link to={'/ProfileEdit'}>
                        <div className="userDetail">
                            <IconContext.Provider value={{ color: 'black', size: '40px' }}>
                                <FaRegUserCircle />
                            </IconContext.Provider>
                            <div>
                                <h1>{username}</h1>
                                <p>{email}</p>
                            </div>
                        </div>
                    </Link>

                    <div style={{ marginTop: '15px' }}>
                        <Link to={'/User'}>
                            <div className="UserOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                        <GoHome className='Dashboard-icons' />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>Home</h1>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/Complaint'}>
                            <div className="UserOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                        <MdOutlineSmsFailed />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>Raise Complaint</h1>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/MyComplaints'}>
                            <div className="UserOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                        <GrDocumentUser />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>My Complaints</h1>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/Communities'}>
                            <div className="UserOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                        <BsFillPeopleFill />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>Communities</h1>
                                </div>
                            </div>
                        </Link>

                        <div className="UserOptions">
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                    <FaBuildingNgo />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>NGOs</h1>
                            </div>
                        </div>
                        <div className="UserOptions" onClick={handleLogout}>
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                    <TbLogout />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>Logout</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
