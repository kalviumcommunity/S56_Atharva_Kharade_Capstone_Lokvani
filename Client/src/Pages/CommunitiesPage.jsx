import React, { useState, useEffect } from 'react';
import './CSS/CommunitiesPage.css';
import UserDashboard from '../Components/UserDashboard';
import axios from 'axios';

const CommunitiesPage = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community`);
                setCommunities(response.data);
            } catch (error) {
                console.error("Error fetching communities:", error);
            }
        };

        fetchCommunities(); 
    }, []); 

    return (
        <div className='Communities-main-body'>
            <UserDashboard />
            <div className="Communities-body">
                {communities.map((community) => (
                    <div className="CommunityPage-box" key={community.id || community._id}>
                        <div className="Community-box-img">
                        </div>
                        <div className="Community-box-title">
                            <h1>{community.title}</h1>
                        </div>
                        <div className="Community-box-desc">
                            <p>{community.description}</p>
                        </div>
                        <div className="Community-box-function">
                            <div className="Community-box-joinbtn">
                                <button className="joinbtn" role="button">Join</button>
                            </div>
                            <div className="Community-box-members">
                                <h1>Members - {community.members || 0}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunitiesPage;
