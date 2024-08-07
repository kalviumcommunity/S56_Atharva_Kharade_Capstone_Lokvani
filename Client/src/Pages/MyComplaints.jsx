import React, { useState, useEffect } from 'react';
import './CSS/MyComplaint.css';
import UserDashboard from '../Components/UserDashboard';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    fetchComplaints();
  }, [userId]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/MyComplaint/${userId}`);
      const data = response.data;
      setComplaints(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching complaints:', error);
    }
  };

  return (
    <>
      <div className="My-Complaint-main-body">
        <UserDashboard />
        <div className="MyComplaint-body">
          {loading ? (
            <div className="loader">
              <l-ring-2
                size="40"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#968ED5"
              ></l-ring-2>
            </div>
          ) : !complaints || complaints.length === 0 ? (
            <div className="No-complaints-message">
              <p>No complaints logged by you.</p>
              <p>Go to <Link to="/Complaint"><span style={{ color: "#2f60b9", textDecoration: "underline" }}>Raise Complaint page</span></Link> to raise a complaint.</p>
            </div>
          ) : (
            complaints.map(complaint => (
              <div key={complaint._id} className="MyComplaint-complaint-box">
                <div className="MyComplaint-box-title">
                  <h1>{complaint.title}</h1>
                </div>
                <div className="MyComplaint-img">
                  <img src={complaint.Image} alt="Complaint Image" className='complaint-img-size' />
                </div>
                <div className="MyComplaint-descp">
                  <p>{complaint.description}</p>
                </div>
                <div className="MyComplaint-function">
                  <div className="MyComplaint-upvote">
                    <BiUpvote className="vote-arrows" />
                    <h1>{((complaint.upvotedBy && complaint.upvotedBy.length) || 0) - ((complaint.downvotedBy && complaint.downvotedBy.length) || 0)}</h1>
                    <BiDownvote className="vote-arrows" />
                  </div>
                  <div className="MyComplaint-comment">
                    <Link to={`/comment/${complaint._id}`}><FaRegComment className="vote-arrows" /></Link>
                    <h1>{complaint.comments.length}</h1>
                  </div>
                  <div className="MyComplaint-status">
                    <Chip
                      label={complaint.verified ? "Verified" : "Not Verified"}
                      color={complaint.verified ? "success" : "warning"}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyComplaints;
