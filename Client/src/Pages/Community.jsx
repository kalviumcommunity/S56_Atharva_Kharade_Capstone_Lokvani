import React, { useState, useEffect } from 'react';
import './CSS/Community.css';
import UserDashboard from '../Components/UserDashboard';
import img from './CSS/Image-Placeholder.png';
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Community = () => {
    const [Community, setCommunity] = useState({});
    const [description, setDescription] = useState('');

    const { name } = useParams();

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}`);
                if (response.status === 200 && response.data) {
                    setCommunity(response.data);
                } else {
                    console.error("Error fetching community:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching community:", error);
            }
        };
        if (name) {
            fetchCommunity();
        }
    }, [name]);

    const handlePostSubmit = async () => {
        const email = Cookies.get('email');
        const postData = {
            description,
            createdBy: email
        };

        try {
            const response = await axios.post(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}/posts`, postData);
            console.log('Post created successfully:', response.data);
            setDescription('');
        } catch (error) {
            console.error('Error creating post:', error.response.data);
        }
    };

    return (
        <div className='Community-main'>
            <UserDashboard />
            <div className="Community-Post-Page">
                <div className="Community-Post-Page-Body">
                    <div className="User-post">
                        <div className="User-post-descp">
                            <InputLabel
                                shrink
                                htmlFor="Complaint-descp-input"
                                style={{
                                    fontSize: "35px",
                                    fontWeight: "400",
                                    color: "#000000",
                                    fontFamily: "Poppins",
                                    marginTop: "10px",
                                }}
                            >
                                Share something with your community:
                            </InputLabel>
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                size='small'
                                InputProps={{
                                    style: {
                                        fontSize: "20px",
                                        marginTop: "-30px",
                                        borderRadius: "6px",
                                    },
                                }}
                            />
                            <button onClick={handlePostSubmit} style={{ border: "1px solid black", padding: "5px 10px", margin: "5px", borderRadius: "5px" }}>Submit Post</button>
                        </div>
                    </div>
                    <div className="Posts-render">
                        {Community.posts && Community.posts.map((post) => (
                            <div className="Posts-list-item">
                                <div className="Post-user-detail">
                                    <div className="user-detail-profile">

                                    </div>
                                    <div className="user-detail-name">
                                        <h1>{post.createdBy}</h1>
                                    </div>
                                </div>
                                <div className="Post-list-descp">
                                    <p>{post.description}</p>
                                </div>
                                <div className="Post-list-function">
                                    <div className="post-upvote">
                                        <BiUpvote className="Post-vote-arrows" />
                                    </div>
                                    <h1>5</h1>
                                    <div className="post-upvote">
                                        <BiDownvote className="Post-vote-arrows" />
                                    </div>
                                    <div className="post-comment">
                                        <FaRegComment className="Post-vote-arrows" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="Community-Comment-Page">
                <div className="Community-descp-box">
                    <div className="Community-descp-box-title">
                        <h1>{Community.name}</h1>
                    </div>
                    <div className="Community-descp-img">
                        <img src={img} alt="community-img" />
                    </div>
                    <div>
                        <button className='Community-join-btn'>Join Community</button>
                    </div>
                    <div className='Community-descp-box-desc'>
                        <p>{Community.description}</p>
                    </div>
                    <div className="Community-descp-box-rules">
                        <h1>Rules</h1>
                        <ul>
                            <li><b>1. Be Respectful:</b>  Treat all users with courtesy and avoid offensive language, personal attacks, or discriminatory remarks.
                            </li>
                            <li><b>2. Stay on Topic:</b>  Focus discussions on issues relevant to the specific community and avoid irrelevant posts or commercial promotions.
                            </li>
                            <li><b>3. Accuracy Matters:</b>  Provide accurate and truthful information when reporting complaints or sharing experiences.
                            </li>
                            <li><b>4. Constructive Communication:</b>  Engage in discussions with a positive and solution-oriented approach. Focus on proposing solutions and collaborating with others.
                            </li>
                            <li><b>5. Report Abuse:</b>  If you encounter any inappropriate content or behavior, report it to the moderators immediately for review and action.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
