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
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { id } = useParams();
    const { name } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community/${name}/posts/${id}`);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [id]);

    const handleCommentSubmit = async (postId) => {
        try {
            const response = await axios.post(`https://your-api-url/community/${id}/posts/${postId}/comments`, {
                comment: commentText,
                email: Cookies.get("email") 
            });
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, response.data]
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            setCommentText('');
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className='Comment-main'>
            <UserDashboard />
            <div className="Comment-body">
                <div className="Comment-Complaint-display">
                    <div className="Comment-Complaint-body">
                        {/* Render Posts and Comments */}
                        {posts.map(post => (
                            <div key={post._id} className="Comment-Complaint">
                                <h1>{post.title}</h1>
                                <div className="Comment-Complaint-descp">
                                    <p>{post.description}</p>
                                </div>
                                <div className="Comment-Complaint-function">
                                    <div className="Complaint-function-votes">
                                        <BiSolidUpvote className="Comment-arrows" />
                                        <h1>{post.voteCount}</h1>
                                        <BiSolidDownvote className="Comment-arrows" />
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
                                            onClick={() => handleCommentSubmit(post._id)}
                                            className='comment-btn'
                                        >
                                            comment
                                        </button>
                                    </div>
                                </div>
                                {/* Render Comments for this post */}
                                {post.comments.length > 0 ? (
                                    post.comments.map((comment, index) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPage;
