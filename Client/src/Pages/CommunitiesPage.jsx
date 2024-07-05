import React, { useState, useEffect, useContext } from 'react';
import './CSS/CommunitiesPage.css';
import UserDashboard from '../Components/UserDashboard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { ring2 } from 'ldrs';

ring2.register();

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    fetchCommunities();
  }, [userId]);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/community`, {
        params: { userId }
      });
      setCommunities(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="loader-container">
            <l-ring-2
                size="40"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#968ED5"
              ></l-ring-2>
          </div>
        ) : communities.length === 0 ? (
          <div className="no-communities-message">
            <p>You haven't subscribed to any community.</p>
          </div>
        ) : (
          communities.map((community) => (
            <Link to={`/community/${encodeURIComponent(community.name)}`} key={community.id || community._id} >
              <div className="CommunityPageBox">
                <div className="Community-box-img">
                  <img src={community.image} className='Community-box-img-box' />
                </div>
                <div className="Community-box-desc">
                  {renderDescription(community.description)}
                </div>
                <div className="Community-box-function">
                  <div className="Community-box-members">
                    <h1>Members - {community.members.length || 0}</h1>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunitiesPage;
