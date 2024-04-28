import React from 'react';
import './CSS/AdminDashboard.css';

import { Link, useNavigate } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GoHome } from 'react-icons/go';
import { GrDocumentUser } from 'react-icons/gr';
import { FaBuildingNgo } from 'react-icons/fa6';
import { TbLogout } from 'react-icons/tb';
import Cookies from 'js-cookie';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const username = Cookies.get('username');
    let email = Cookies.get('email');

    const maxEmailLength = 20;
    if (email && email.length > maxEmailLength) {
        email = email.slice(0, maxEmailLength) + '...';
    }

    const handleLogout = () => {
        Cookies.remove('username');
        Cookies.remove('email');
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

                    <div className="userDetail">
                        <IconContext.Provider value={{ color: 'black', size: '40px' }}>
                            <FaRegUserCircle />
                        </IconContext.Provider>
                        <div>
                            <h1>Admin</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: '15px' }}>

                        <div className="AdminOptions">
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '35px' }}>
                                    <GrDocumentUser />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>Verification</h1>
                            </div>
                        </div>
                        <Link to={'/AdminComplaints'}>
                        <div className="AdminOptions">
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '35px' }}>
                                    <GrDocumentUser />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>Complaints</h1>
                            </div>
                        </div>
                        </Link>

                        {/* <Link to={'/Communities'}> */}
                            <div className="AdminOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider value={{ color: 'black', size: '35px' }}>
                                        <FaRegUserCircle />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>Profiles</h1>
                                </div>
                            </div>
                        {/* </Link> */}

                        <div className="AdminOptions">
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '35px' }}>
                                    <FaBuildingNgo />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>NGOs</h1>
                            </div>
                        </div>
                        <div className="AdminOptions" onClick={handleLogout}>
                            <div className="UserIcon">
                                <IconContext.Provider value={{ color: 'black', size: '35px' }}>
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

export default AdminDashboard;
