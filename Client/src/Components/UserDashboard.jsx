import React from 'react'
import './UserDashboard.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { GoHome } from "react-icons/go";
import { GrDocumentUser } from "react-icons/gr";
import { MdOutlineSmsFailed } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBuildingNgo } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import Cookies from 'js-cookie';

import { Link } from 'react-router-dom'

const UserDashboard = () => {

    const username = Cookies.get('username');
    const email = Cookies.get('email');

    return (
        <>
            <div className='Sidenav'>
                <div className="Sidenav1">
                    <div className="SideNav-logo">
                        <div className="logoSidenav">
                        </div>
                        <div>
                            <h1>LOKVANI</h1>
                        </div>
                    </div>

                    <div className="userDetail">
                        <IconContext.Provider
                            value={{ color: 'black', size: '40px' }}
                        >
                            <FaRegUserCircle />
                        </IconContext.Provider>
                        <div>
                            <h1>{username}</h1>
                            <p>{email}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Link to={'/User'}>
                            <div className="UserOptions">
                                <div className="UserIcon">
                                    <IconContext.Provider
                                        value={{ color: 'black', size: '30px' }}
                                    >
                                        <GoHome />
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
                                    <IconContext.Provider
                                        value={{ color: 'black', size: '30px' }}
                                    >
                                        <MdOutlineSmsFailed />
                                    </IconContext.Provider>
                                </div>
                                <div>
                                    <h1>Raise Complaint</h1>
                                </div>
                            </div>
                        </Link>

                        <div className="UserOptions">
                            <div className="UserIcon">
                                <IconContext.Provider
                                    value={{ color: 'black', size: '30px' }}
                                >
                                    <GrDocumentUser />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>My Complaints</h1>
                            </div>
                        </div>

                        <div className="UserOptions">
                            <div className="UserIcon">
                                <IconContext.Provider
                                    value={{ color: 'black', size: '30px' }}
                                >
                                    <BsFillPeopleFill />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>Communities</h1>
                            </div>
                        </div>

                        <div className="UserOptions">
                            <div className="UserIcon">
                                <IconContext.Provider
                                    value={{ color: 'black', size: '30px' }}
                                >
                                    <FaBuildingNgo />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h1>NGOs</h1>
                            </div>
                        </div>
                        <div className="UserOptions">
                            <div className="UserIcon">
                                <IconContext.Provider
                                    value={{ color: 'black', size: '30px' }}
                                >
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
    )
}

export default UserDashboard
