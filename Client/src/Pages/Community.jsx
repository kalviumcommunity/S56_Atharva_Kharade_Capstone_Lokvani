import React, { useState, useEffect } from 'react';
import './CSS/Community.css';
import UserDashboard from '../Components/UserDashboard';
import img from './CSS/Image-Placeholder.png';
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link,useNavigate } from 'react-router-dom';

const Community = () => {
    const [community, setCommunity] = useState({});
    const [description, setDescription] = useState('');
    const [posts, setPosts] = useState([]);
    const { name } = useParams();
    const [userEmail, setEmail] = useState("");
    const [username, setUsername] = useState("");

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
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}`);
                if (response.status === 200 && response.data) {
                    setCommunity(response.data);
                    setPosts(response.data.posts);
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
        const postData = {
            description,
            createdBy: userEmail
        };

        try {
            const response = await axios.post(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}/posts`, postData);
            console.log('Post created successfully:', response.data);
            setDescription('');
        } catch (error) {
            console.error('Error creating post:', error.response.data);
        }
    };

    const handleClick = (_id) => {
        const post = posts.find(post => post._id === _id);
        if (post) {
            console.log(userEmail);
        } else {
            console.log("Post not found");
        }
    }

    const handleUpvote = async (_id) => {
        try {
            const postIndex = posts.findIndex(post => post._id === _id);
            if (postIndex === -1) {
                console.error("Post not found");
                return;
            }

            const updatedPosts = [...posts];
            const post = updatedPosts[postIndex];

            if (!post.upvotedBy || !post.downvotedBy) {
                console.error("UpvotedBy or downvotedBy is undefined");
                return;
            }

            if (post.upvotedBy.includes(userEmail)) {
                const emailIndex = post.upvotedBy.indexOf(userEmail);
                post.upvotedBy.splice(emailIndex, 1);
                post.voteCount -= 1;
            } else {
                if (post.downvotedBy.includes(userEmail)) {
                    const downvotedIndex = post.downvotedBy.indexOf(userEmail);
                    post.downvotedBy.splice(downvotedIndex, 1);
                    post.voteCount += 1;
                }
                post.upvotedBy.push(userEmail);
                post.voteCount += 1;
            }

            const response = await axios.put(
                `https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}/posts/${_id}/upvote`,
                { userEmail }
            );

            if (response.status === 200) {
                updatedPosts[postIndex] = post;
                setPosts(updatedPosts);
            } else {
                console.error("Error upvoting post:", response.statusText);
            }
        } catch (error) {
            console.error("Error upvoting post:", error);
        }
    }

    const handleDownvote = async (_id) => {
        try {
            const postIndex = posts.findIndex(post => post._id === _id);
            if (postIndex === -1) {
                console.error("Post not found");
                return;
            }

            const updatedPosts = [...posts];
            const post = updatedPosts[postIndex];

            if (!post.upvotedBy || !post.downvotedBy) {
                console.error("UpvotedBy or downvotedBy is undefined");
                return;
            }

            if (post.downvotedBy.includes(userEmail)) {
                const emailIndex = post.downvotedBy.indexOf(userEmail);
                post.downvotedBy.splice(emailIndex, 1);
                post.voteCount += 1;
            } else {
                if (post.upvotedBy.includes(userEmail)) {
                    const upvotedIndex = post.upvotedBy.indexOf(userEmail);
                    post.upvotedBy.splice(upvotedIndex, 1);
                    post.voteCount -= 1;
                }
                post.downvotedBy.push(userEmail);
                post.voteCount -= 1;
            }

            const response = await axios.put(
                `https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}/posts/${_id}/downvote`,
                { userEmail }
            );

            if (response.status === 200) {
                updatedPosts[postIndex] = post;
                setPosts(updatedPosts);
            } else {
                console.error("Error downvoting post:", response.statusText);
            }
        } catch (error) {
            console.error("Error downvoting post:", error);
        }
    }

    const handleLeaveCommunity = async (communityId) => {
        const email = Cookies.get('email');
        try {
            const response = await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/removeMember`, { communityId, email });
            console.log('Left Community:', response.data);
            navigate('/Communities');
        }
        catch (error) {
            console.error('Error leaving community:', error);
        }

    }

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
                        {posts.map((post) => (
                            <div key={post._id} className="Posts-list-item">
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
                                    {post.upvotedBy && post.upvotedBy.includes(userEmail) ? (
                                        <BiSolidUpvote className="vote-arrows arrows-fill" onClick={() => handleUpvote(post._id)} />
                                    ) : (
                                        <BiUpvote className="vote-arrows" onClick={() => handleUpvote(post._id)} />
                                    )}
                                    <h1>{((post.upvotedBy && post.upvotedBy.length) || 0) - ((post.downvotedBy && post.downvotedBy.length) || 0)}</h1>
                                    {post.downvotedBy && post.downvotedBy.includes(userEmail) ? (
                                        <BiSolidDownvote className="vote-arrows arrows-fill" onClick={() => handleDownvote(post._id)} />
                                    ) : (
                                        <BiDownvote className="vote-arrows" onClick={() => handleDownvote(post._id)} />
                                    )}
                                    <div className="post-comment">
                                        <Link to={`/community/${name}/posts/${post._id}`}><FaRegComment className="Post-vote-arrows" /></Link>
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
                        <h1>{community.name}</h1>
                    </div>
                    <div className="Community-descp-img">
                        <img src={img} alt="community-img" onClick={() => handleClick("66308db0523c7a2afedbdd27")} />
                    </div>
                    <div>
                        <button className='Community-join-btn' onClick={()=>handleLeaveCommunity(community._id)}>Leave Community</button>
                    </div>
                    <div className='Community-descp-box-desc'>
                        <p>{community.description}</p>
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
