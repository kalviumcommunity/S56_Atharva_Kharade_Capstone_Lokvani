import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import './CSS/UserDashboard.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';

import { FaRegUserCircle } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { GrDocumentUser } from 'react-icons/gr';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { CgProfile } from "react-icons/cg";
import { BsPeopleFill } from "react-icons/bs";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem('username');
  const Image = sessionStorage.getItem('userImage');

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
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
            <div className="userDetailProfilePic">
              <img src={Image} alt="Profile" />
            </div>
            <div>
              <h1>{username}</h1>
            </div>
          </div>
        </Link>

        <div style={{ marginTop: '15px' }}>
          <Link to={'/User'}>
            <div className={`UserOptions ${location.pathname === '/User' ? 'active' : ''}`}>
              <div className="UserIcon">
                <GoHome className='DB-UserIcon' />
              </div>
              <div>
                <h1>Home</h1>
              </div>
            </div>
          </Link>

          <Link to={'/Complaint'}>
            <div className={`UserOptions ${location.pathname === '/Complaint' ? 'active' : ''}`}>
              <div className="UserIcon">
                <MdOutlineSmsFailed className='DB-UserIcon' />
              </div>
              <div>
                <h1>Raise Complaint</h1>
              </div>
            </div>
          </Link>

          <Link to={'/MyComplaints'}>
            <div className={`UserOptions ${location.pathname === '/MyComplaints' ? 'active' : ''}`}>
              <div className="UserIcon">
                <GrDocumentUser className='DB-UserIcon' />
              </div>
              <div>
                <h1>My Complaints</h1>
              </div>
            </div>
          </Link>

          <Link to={'/Communities'}>
            <div className={`UserOptions ${location.pathname === '/Communities' ? 'active' : ''}`}>
              <div className="UserIcon">
                <BsPeopleFill className='DB-UserIcon' />
              </div>
              <div>
                <h1>Communities</h1>
              </div>
            </div>
          </Link>

          <div className="UserOptions" onClick={handleLogout}>
            <div className="UserIcon">
              <TbLogout className='DB-UserIcon' />
            </div>
            <div>
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
