import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserDashboard from '../Components/UserDashboard';
import img from './CSS/Image-Placeholder.png';
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import './CSS/CommentPage.css';

const CommentPage = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    console.log(id);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint/${id}`);
                setComplaint(response.data);
            } catch (error) {
                console.error("Error fetching complaint:", error);
            }
        };

        fetchComplaint();
    }, [id]);

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
                            <textarea name="" id="" rows="3" placeholder='write a comment..' className='Comment-input-box'></textarea>
                            <div className='Comment-btn-flex'>
                                <button className='comment-btn'>comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Community-descp-main">
                    <div className="Community-descp-box">
                        {/* Display comments */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPage;
