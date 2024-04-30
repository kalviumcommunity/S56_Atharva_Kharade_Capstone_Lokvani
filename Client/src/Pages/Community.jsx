import React from 'react'
import './CSS/Community.css'
import UserDashboard from '../Components/UserDashboard'
import img from './CSS/Image-Placeholder.png'
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Community = () => {
    const [Community, setCommuntiy] = useState([]);

    const { name } = useParams();
    useEffect(() => {
      
        const fetchCommunity = async () => {
          try {
            const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}`);
            if (response.status === 200 && response.data) {
              setCommuntiy(response.data);
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
      }, []);
      
    return (
        <div className='Community-main'>
            <UserDashboard />
            <div className="Communtiy-body">
                <div className="Community-posts-body">
                    <div className="Posts-body">
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
                            </div>
                            <div className="User-post-upload">
                                <h1>Upload Image</h1>
                                <input type="file" />
                            </div>
                        </div>
                        <div className="Posts-list">
                            <div className="Posts-list-item">
                                <div className="Post-user-detail">
                                    <div className="user-detail-profile">

                                    </div>
                                    <div className="user-detail-name">
                                        <h1>Name</h1>
                                    </div>
                                </div>
                                <div className="Post-list-descp">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit corrupti totam quasi? Quod corporis id molestias sed consequuntur, similique odit dolore quaerat earum dolor fugiat eum praesentium, minus, quis aliquam!</p>
                                </div>
                                <div className="Post-list-function">
                                    <div className="post-upvote">
                                        <BiUpvote className="Post-vote-arrows" />
                                    </div>
                                    <h1>6</h1>
                                    <div className="post-upvote">
                                        <BiDownvote className="Post-vote-arrows" />
                                    </div>
                                    <div className="post-comment">
                                        <FaRegComment className="Post-vote-arrows" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Community-descp-main">
                    <div className="Community-descp-box">
                        <div className="Community-descp-box-title">
                            <h1>{Community.name}</h1>
                        </div>
                        <div className="Community-descp-img">
                            <img src={img} alt="community-img" />
                        </div>
                        <div className='Community-descp-box-desc'>
                            <p>{Community.description}</p>
                        </div>
                        <div className="Community-descp-box-rules">
                            <h1>Rules</h1>
                            <ul>
                                <li>Be Respectful:  Treat all users with courtesy and avoid offensive language, personal attacks, or discriminatory remarks.
                                </li>
                                <li>Stay on Topic:  Focus discussions on issues relevant to the specific community and avoid irrelevant posts or commercial promotions.
                                </li>
                                <li>Accuracy Matters:  Provide accurate and truthful information when reporting complaints or sharing experiences.
                                </li>
                                <li>Constructive Communication:  Engage in discussions with a positive and solution-oriented approach. Focus on proposing solutions and collaborating with others.
                                </li>
                                <li>Report Abuse:  If you encounter any inappropriate content or behavior, report it to the moderators immediately for review and action.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Community
