import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/AdminPage.css';
import AdminDashboard from '../Components/AdminDashboard';
import SortBySelect from '../Components/SortBy';
import SearchInput from '../Components/Search';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchAdminComplaints();
  }, []);

  const fetchAdminComplaints = async () => {
    try {
      const response = await axios.get('/AdminComplaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching admin complaints:', error);
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
          {complaints.map(complaint => (
            <div key={complaint._id} className="Admin-Complaint-box">
              <div className="Admin-Complaint-box-left">
                <div className="Admin-Complaint-img">
                  <img src={complaint.Image} alt="Complaint" />
                </div>
                <div className="Admin-Complaint-title">
                  <h1>{complaint.title}</h1>
                </div>
                <div className="Admin-Complaint-descp">
                  <p>{complaint.description}</p>
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
                  <h1>Comments - {complaint.comments.length}</h1>
                </div>
                <div className="Admin-Complaint-Functions">
                  <button>Verify</button>
                  <button>Delete</button>
                  <button>Re-Lodge</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
