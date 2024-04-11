import React, { useState, useEffect } from "react";
import "./CSS/MainPage.css";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";

import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import CustomPagination from "../Components/Pagination";

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
};

const MainPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint`,
        {
          params: {
            page: currentPage,
            limit: 3,
          },
        }
      );
      setComplaints(response.data.complaints);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVote = async (index, voteType) => {
    try {
      const username = getCookie('username');
      const updatedComplaints = [...complaints];
      const complaintId = updatedComplaints[index]._id;
      await axios.put(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint/${complaintId}`,
        { username, voteType }
      );
      fetchComplaints();
    } catch (error) {
      console.error("Error voting:", error);
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
              <SortBySelect />
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
                      <BiUpvote
                        className="vote-arrows"
                        onClick={() => handleVote(index, 'upvote')}
                      />
                      <h1>{complaint.votes}</h1>
                      <BiDownvote
                        className="vote-arrows"
                        onClick={() => handleVote(index, 'downvote')}
                      />
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
                    <img
                      src={complaint.Image}
                      alt="Complaint"
                      className="complaint-img-size"
                    />
                  </div>
                  <div className="lower-right-tags">
                    <div className="ComplaintType">
                      <div className="function-Type">
                        <h1>{complaint.complaintType}</h1>
                      </div>
                    </div>
                    <div className="Complaint-verfication">
                      <div className="function-reviewTag">
                        <h1>
                          {complaint.verified ? "Verified" : "Not Verified"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <CustomPagination
            count={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
      <div className="MainPage-side">
        <div className="MainPage-side-Navbar"></div>
      </div>
    </div>
  );
};

export default MainPage;
