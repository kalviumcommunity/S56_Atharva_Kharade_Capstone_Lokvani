import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserDashboard from '../Components/UserDashboard';
import img from './CSS/Image-Placeholder.png';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import './CSS/CommentPage.css';
import Cookies from 'js-cookie';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const CommentPage = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [userEmail, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        handleUserDetails();
    }, []);


    const handleUserDetails = async () => {
        const token = Cookies.get("token");
        try {
          const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails", {
            headers: {
              Authorization: token
            }
          });
          console.log(response.data);
          setEmail(response.data.email);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/ComplaintComment/${id}`);
                setComplaint(response.data);
            } catch (error) {
                console.error("Error fetching complaint:", error);
            }
        };

        fetchComplaint();
    }, [id]);

    const handleCommentSubmit = async () => {
        try {
            await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/comment/${id}`, {
                email: email,
                comment: commentText
            });
            const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/ComplaintComment/${id}`);
            setComplaint(response.data);
            setCommentText("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!complaint) return <div>Loading...</div>;

    return (
        <div className='Comment-main'>
            <UserDashboard />
            <div className="Comment-body">
                <div className="Comment-Complaint-display">
                    <div className="Comment-Complaint-body">
                        <div className="Comment-Complaint">
                            <h1>{complaint.title}</h1>
                            <div className="Comment-Complaint-img">
                                <img src={complaint.Image || img} alt="Complaint" className='Comment-img' />
                            </div>
                            <div className="Comment-Complaint-descp">
                                <p>{complaint.description}</p>
                            </div>
                            <div className="Comment-Complaint-function">
                                <div className="Complaint-function-votes">
                                    <BiSolidUpvote className="Comment-arrows" />
                                    <h1>{complaint.voteCount}</h1>
                                    <BiSolidDownvote className="Comment-arrows" />
                                </div>
                                <div className="Complaint-function-type">
                                    <div className="Complaint-chip">
                                        <h1>{complaint.complaintType}</h1>
                                    </div>
                                </div>
                                <div className="Complaint-function-Area">
                                    <div className="Complaint-chip">
                                        <h1>{complaint.area}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Comment-Complaint-post">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows="3"
                                placeholder='write a comment..'
                                className='Comment-input-box'
                            ></textarea>
                            <div className='Comment-btn-flex'>
                                <button
                                    onClick={handleCommentSubmit}
                                    className='comment-btn'
                                >
                                    comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Comment-descp-main">
                    <div className="Comment-descp-box">
                        <h1 style={{ color: "black", fontSize: "30px" }}>Comments</h1>
                        {complaint.comments.length > 0 ? (
                            complaint.comments.map((comment, index) => (
                                <div key={index} className="Comment-Box">
                                    <div className="Comment-Box-title">
                                        <div className="Comment-Box-logo">
                                            <IconContext.Provider value={{ color: 'black', size: '40px' }}>
                                                <FaRegUserCircle />
                                            </IconContext.Provider>
                                        </div>
                                        <h1 style={{ color: "black", fontSize: "15px" }}>{comment.email}</h1>
                                        <h1 style={{ color: "black", fontSize: "15px" }}>
                                            {new Date(comment.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                                        </h1>

                                    </div>
                                    <div className="Comment-Box-descp">
                                        <p style={{ color: "black", fontSize: "20px" }}>{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommentPage;
