import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserDashboard from '../Components/UserDashboard';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import './CSS/CommentPage.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { UserContext } from '../UserContext';

const CommentPage = () => {
    const { user } = useContext(UserContext);
    const { userId } = user;
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');

    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [commentText, setCommentText] = useState("");

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

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                return;
            }
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/userDataImage/${userId}`);
                setUsername(response.data.user.username);
                setUserImage(response.data.user.Image);
                console.log('User Image:', response.data.user.Image)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleCommentSubmit = async () => {
        try {
            await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/comment/${id}`, {
                userId: userId,
                comment: commentText,
                Image: userImage
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
                            complaint.comments.slice().reverse().map((comment, index) => (
                                <div key={index} className="Comment-Box">
                                    <div className="Comment-Box-title">
                                        <div className="Comment-Box-logo">
                                            <IconContext.Provider value={{ color: 'black', size: '40px' }}>
                                                {comment.Image ? (
                                                    <img src={comment.Image} alt="User" className='User-img' />
                                                ) : (
                                                    <FaRegUserCircle />
                                                )}
                                            </IconContext.Provider>
                                        </div>
                                        <h1 style={{ color: "black", fontSize: "15px" }}>{comment.username}</h1>
                                        <h1 style={{ color: "black", fontSize: "15px" }}>
                                            {new Date(comment.timestamp).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
