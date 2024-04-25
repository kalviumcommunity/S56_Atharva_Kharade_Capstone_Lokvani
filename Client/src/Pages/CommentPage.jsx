import React from 'react'
import './CSS/CommentPage.css'
import UserDashboard from '../Components/UserDashboard'
import img from './CSS/Image-Placeholder.png'
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { FaRegComment } from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

const CommentPage = () => {
    return (
        <div className='Comment-main'>
            <UserDashboard />
            <div className="Comment-body">
                <div className="Comment-Complaint-display">
                    <div className="Comment-Complaint-body">
                        <div className="Comment-Complaint">
                            <h1>Lorem ipsum dolor sit amet.</h1>
                            <div className="Comment-Complaint-img">
                                <img src={img} alt="Complaint" className='Comment-img' />
                            </div>
                            <div className="Comment-Complaint-descp">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, veniam? Obcaecati amet soluta est consequatur tempora, qui inventore earum distinctio eveniet placeat iure temporibus rerum beatae hic ipsa autem neque.</p>
                            </div>
                            <div className="Comment-Complaint-function">
                                <div className="Complaint-function-votes">
                                    <BiSolidUpvote className="Comment-arrows" />
                                    <h1>5</h1>
                                    <BiSolidDownvote className="Comment-arrows" />
                                </div>
                                <div className="Complaint-function-type">
                                    <div className="Complaint-chip">
                                        <h1>Water Pollution</h1>
                                    </div>

                                </div>
                                <div className="Complaint-function-Area">
                                    <div className="Complaint-chip">
                                        <h1>Hadapsar</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Comment-Complaint-post">
                            <textarea name="" id=""  rows="3" placeholder='write a comment..' className='Comment-input-box'></textarea>
                            <div className='Comment-btn-flex'>
                                <button className='comment-btn'>comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Community-descp-main">
                    <div className="Community-descp-box">
                        {/* <Input type="email" variant="bordered" label="Email" /> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CommentPage
