import React from "react";
import "./MainPage.css";
import { useState, useEffect } from "react";
import PuneAreaSelect from "../Components/AreaSelect";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";

import { BsArrowDownSquare } from "react-icons/bs";
import { BsArrowUpSquare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const MainPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
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
          {complaints.map((complaint) => (
            <div className="Complaint-Box" key={complaint._id}>
              <div className="Complaint-data">
                <div className="Complaint-title">
                  <h1>{complaint.title}</h1>
                </div>
                <div className="Complaint-descp">
                  <p>{complaint.description}</p>
                </div>
                <div className="Comaplaint-functionalities">
                  <div className="function-vote">
                    <div className="upvote">
                      <BsArrowUpSquare />
                    </div>
                    <h1>4</h1>
                    <div className="downvote">
                      <BsArrowDownSquare />
                    </div>
                  </div>
                  <div className="function-comment">
                    <FaRegComment />
                  </div>
                  <div className="function-reviewTag">
                    <h1>Verified</h1>
                  </div>
                  <div className="function-Type">
                    <h1>{complaint.complaintType}</h1>
                  </div>
                </div>
              </div>
              <div className="complaint-img">
                {complaint.image && <img src={complaint.image} alt="Complaint" />}
              </div>
            </div>
          ))}
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
