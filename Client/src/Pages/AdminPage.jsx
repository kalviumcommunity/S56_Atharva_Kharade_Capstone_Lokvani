import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/AdminPage.css';
import AdminDashboard from '../Components/AdminDashboard';
import SortBySelect from '../Components/SortBy';
import SearchInput from '../Components/Search';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminComplaints();
  }, []);

  const fetchAdminComplaints = async () => {
    try {
      const response = await axios.get('https://s56-atharva-kharade-capstone-lokvani.onrender.com/AdminComplaints');
      setComplaints(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin complaints:', error);
      setLoading(false);
    }
  };

  const renderDescription = (description) => {
    if (description.split(' ').length > 25) {
      return (
        <>
          {description.split(' ').slice(0, 25).join(' ')}...
          <span className="view-more">View More</span>
        </>
      );
    }
    return description;
  };

  const handleVerify = async (id) => {
    try {
      await axios.put(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/VerifyComplaint/${id}`, { verified: true });
      fetchAdminComplaints();
    } catch (error) {
      console.error('Error verifying complaint:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/DeleteComplaint/${id}`);
      fetchAdminComplaints();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <div className='AdminPage-main-body'>
      <AdminDashboard />
      <div className="AdminPage-body">
        <div className="Admin-SearchBar">
          <div className="SearchBar-left">
            <div className="SearchBar-sort">
              <SortBySelect />
            </div>
            <div className="SearchBar-areaSelect">
              <SortBySelect />
            </div>
          </div>
          <div className="SeachBar-searchInput">
            <SearchInput />
          </div>
        </div>
        <div className="Admin-Complaints">
          {loading ? (
            <p>Loading...</p>
          ) : (
            complaints.length > 0 ? (
              complaints.map(complaint => (
                <div key={complaint._id} className="Admin-Complaint-box">
                  <div className="Admin-Complaint-box-left">
                    <div className="Admin-Complaint-img">
                      <img src={complaint.Image} alt="Complaint" className='complaint-img-size' />
                    </div>
                    <div className="Admin-Complaint-title">
                      <h1>{complaint.title}</h1>
                    </div>
                    <div className="Admin-Complaint-descp">
                      <p>{renderDescription(complaint.description)}</p>
                    </div>
                  </div>
                  <div className="Admin-Complaint-box-right">
                    <div className="Admin-Complaint-Area">
                      <h1>Area - {complaint.area}</h1>
                    </div>
                    <div className="Admin-Complaint-Type">
                      <h1>Type - {complaint.complaintType}</h1>
                    </div>
                    <div className="Admin-Complaint-Votes">
                      <h1>Votes - {complaint.upvotedBy.length}</h1>
                    </div>
                    <div className="Admin-Complaint-Comments">
                      <h1>Comments - 4</h1>
                    </div>
                    <div className="Admin-Complaint-Functions">
                      <button onClick={() => handleVerify(complaint._id)}>Verify</button>
                      <button onClick={() => handleDelete(complaint._id)}>Delete</button>
                      <button>Re-Lodge</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No complaints available</p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
