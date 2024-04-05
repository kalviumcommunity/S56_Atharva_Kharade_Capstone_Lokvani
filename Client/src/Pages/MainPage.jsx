import React, { useState, useEffect } from "react";
import "./MainPage.css";
import PuneAreaSelect from "../Components/AreaSelect";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";

import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";

const MainPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint?page=${page}&limit=${limit}`);
      setComplaints(response.data.complaints);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handlePageChange = (page) => {
    fetchComplaints(page);
  };

  return (
    <div className="MainPage-body">
      <div className="MainPage-middle">
        <div className="middle-SearchBar">
          <div className="SearchBar-left">
            <div className="SearchBar-sort">
              <SortBySelect />
            </div>
            <div className="SearchBar-areaSelect">
              <PuneAreaSelect />
            </div>
          </div>
          <div className="SeachBar-searchInput">
            <SearchInput />
          </div>
        </div>
        <div className="middle-Complaints">
          {complaints.map((complaint, index) => (
            <div className="Complaint-Box" key={index}>
              <div className="Complaint-Box-title">
                <h1>{complaint.title}</h1>
              </div>
              <div className="Complaint-lower">
                <div className="Complaint-lower-descp">
                  <div className="Complaint-descp">
                    <p>{complaint.description}</p>
                  </div>
                  <div className="lower-descp-funct">
                    <div className="Complaint-vote">
                      <BsArrowUpSquare className="vote-arrows" />
                      <h1>4</h1>
                      <BsArrowDownSquare className="vote-arrows" />
                    </div>
                    <div className="Complaint-comment">
                      <FaRegComment className="vote-arrows" />
                      <h1>4</h1>
                    </div>
                    <div className="Complaint-report">
                      <MdOutlineReport className="vote-report" />
                    </div>
                  </div>
                </div>
                <div className="Complaint-lower-right">
                  <div className="lower-right-img">
                    <img src={complaint.Image} alt="Complaint" className="complaint-img-size" />
                  </div>
                  <div className="lower-right-tags">
                    <div className="ComplaintType">
                      <div className="function-Type">
                        <h1>{complaint.complaintType}</h1>
                      </div>
                    </div>
                    <div className="Complaint-verfication">
                      <div className="function-reviewTag">
                        <h1>{complaint.verified ? 'Verified' : 'Not Verified'}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {pagination.currentPage > 1 && (
            <button onClick={() => handlePageChange(pagination.currentPage - 1)}>Previous</button>
          )}
          {pagination.currentPage < pagination.totalPages && (
            <button onClick={() => handlePageChange(pagination.currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
      <div className="MainPage-side">
        <div className="MainPage-side-Navbar">
        </div>
      </div>
    </div>
  );
};

export default MainPage;
