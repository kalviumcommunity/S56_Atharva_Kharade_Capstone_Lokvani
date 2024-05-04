import React, { useState, useEffect } from 'react';
import './CSS/CommunitiesPage.css';
import UserDashboard from '../Components/UserDashboard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

const CommunitiesPage = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            const email = Cookies.get("email");
            try {
                const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community`, {
                    params: { email }
                });
                setCommunities(response.data);
            } catch (error) {
                console.error("Error fetching communities:", error);
            }
        };

        fetchCommunities();
    }, []);

    const renderDescription = (description) => {
        if (description.split(' ').length > 25) {
            const shortenedDescription = description.split(' ').slice(0, 25).join(' ');
            return (
                <p>
                    {shortenedDescription}{' '}
                    <button className="viewMoreBtn">View More</button>
                </p>
            );
        }
        return <p>{description}</p>;
    };

    return (
        <div className='Communities-main-body'>
            <UserDashboard />
            <div className="Communities-body">
                {communities.map((community) => (
                    <Link to={`/community/${encodeURIComponent(community.name)}`} key={community.id || community._id} className="CommunityPage-box">
                        <div className="Community-box-img">
                        </div>
                        <div className="Community-box-title">
                            <h1>{community.name}</h1>
                        </div>
                        <div className="Community-box-desc">
                            {renderDescription(community.description)}
                        </div>
                        <div className="Community-box-function">
                            <div className="Community-box-members">
                                <h1>Members - {community.members.length || 0}</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CommunitiesPage;
