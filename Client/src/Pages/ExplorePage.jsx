import React from 'react';
import './CSS/ExplorePage.css';
import logComp from './Assets/ComplaintLog.png';
import comm from './Assets/Community.png';
import complaint from './Assets/Complaint.png';
import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div className="ExplorePage-1">
      <section className="intro-section">
        <h1>Welcome to Lokvani</h1>
        <p>Lokvani enables citizens to lodge complaints about local issues and fosters community connections to make Pune a better place.</p>
        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', width: "100%", marginTop: "20px" }}>
          <Link to={'/SignUp'}>
            <button className="SignUp-btn">Join Now</button>
          </Link>
        </div>
      </section>

      <section className="complaint-section">
        <h2>How to Lodge a Complaint</h2>
        <div className='complaint-section-details'>
          <ol>
            <li><strong>Register/Login:</strong> Create an account or log in.</li>
            <li><strong>Navigate to Complaint Section:</strong> Find the complaint section on the website.</li>
            <li><strong>Fill Complaint Form:</strong> Fill out the complaint form with required and optional details.</li>
            <li><strong>Submit Complaint:</strong> Once submitted, the complaint will be reviewed by the admin.</li>
          </ol>
          <img src={logComp} className="logComp-image" />
        </div>
      </section>

      <section className="community-section">
        <h2>Community Features</h2>
        <div className='community-section-details'>
          <img src={comm} alt="Community Features" className="logComp-image" />
          <ul>
            <li><strong>Find Communities:</strong> Find and join communities based on interests or locality.</li>
            <li><strong>Creating Posts:</strong> Create posts within communities for events, awareness drives, etc.</li>
            <li><strong>Engaging with Posts:</strong> Comment, upvote, and downvote posts.</li>
          </ul>
        </div>
      </section>

      <section className="complaint-section">
        <h2>Interacting with Complaints</h2>
        <div className="community-section-details">
          <ul>
            <li><strong>Commenting on Complaints:</strong> Add comments and provide solutions.</li>
            <li><strong>Voting on Complaints:</strong> Upvote or downvote complaints to impact their visibility.</li>
          </ul>
          <img src={complaint} alt="Interacting with Complaints" className="logComp-image" />
        </div>
      </section>

      <section className="complaint-section-1">
        <h2>User Engagement Features</h2>
        <ul>
          <li><strong>Notifications:</strong> Receive updates on complaints and community posts.</li>
          <li><strong>Profile Management:</strong> Manage your profile, update information, and track activity.</li>
          <li><strong>Feedback:</strong> Provide feedback on the platform and report issues.</li>
        </ul>
      </section>

      <section className="contact-section">
        <h2>Contact and Support</h2>
        <p>If you need further assistance, contact us at lokvani.notifications@gmail.com.</p>
      </section>
    </div>
  );
}

export default Explore;
