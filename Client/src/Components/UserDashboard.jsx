import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import './CSS/UserDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
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
  const { email, username } = user;
  const navigate = useNavigate();

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

        <div className="userDetail">
          <FaRegUserCircle className='DB-UserDIcon' />
          <div>
            <h1>{username}</h1>
            <p>{email}</p>
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <Link to={'/User'}>
            <div className="UserOptions">
              <div className="UserIcon">
                <GoHome className='DB-UserIcon' />
              </div>
              <div>
                <h1>Home</h1>
              </div>
            </div>
          </Link>

          <Link to={'/Complaint'}>
            <div className="UserOptions">
              <div className="UserIcon">
                <MdOutlineSmsFailed className='DB-UserIcon' />
              </div>
              <div>
                <h1>Raise Complaint</h1>
              </div>
            </div>
          </Link>

          <Link to={'/MyComplaints'}>
            <div className="UserOptions">
              <div className="UserIcon">
                <GrDocumentUser className='DB-UserIcon' />
              </div>
              <div>
                <h1>My Complaints</h1>
              </div>
            </div>
          </Link>

          <Link to={'/Communities'}>
            <div className="UserOptions">
              <div className="UserIcon">
                <BsPeopleFill className='DB-UserIcon' />
              </div>
              <div>
                <h1>Communities</h1>
              </div>
            </div>
          </Link>

          <Link to={'/ProfileEdit'}>
            <div className="UserOptions">
              <div className="UserIcon">
                <CgProfile className='DB-UserIcon' />
              </div>
              <div>
                <h1>Profile</h1>
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
