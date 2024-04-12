import React, { useState, useEffect } from "react";
import "./CSS/MainPage.css";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";
import Cookies from "js-cookie";

import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import CustomPagination from "../Components/Pagination";

const MainPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint`, {
        params: {
          page: currentPage,
          limit: 3
        }
      });
      setComplaints(response.data.complaints);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const userEmail = Cookies.get("email");

  const handleUpvote = async (index) => {
    try {
      const complaint = complaints[index];

      const response = await axios.put(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/${complaint._id}/upvote`,
        { userEmail }
      );

      if (response.status === 200) {
        const updatedComplaints = [...complaints];
        const updatedComplaint = { ...complaint };

        if (updatedComplaint.upvotedBy.includes(userEmail)) {
          const emailIndex = updatedComplaint.upvotedBy.indexOf(userEmail);
          updatedComplaint.upvotedBy.splice(emailIndex, 1);
        } else {
          const downvotedIndex = updatedComplaint.downvotedBy.indexOf(userEmail);
          if (downvotedIndex !== -1) {
            updatedComplaint.downvotedBy.splice(downvotedIndex, 1);
          }
          updatedComplaint.upvotedBy.push(userEmail);
        }
        const upvoteCount = updatedComplaint.upvotedBy.length;
        const downvoteCount = updatedComplaint.downvotedBy.length;
        const totalCount = upvoteCount - downvoteCount;

        updatedComplaint.voteCount = totalCount;

        updatedComplaints[index] = updatedComplaint;
        setComplaints(updatedComplaints);
      }
    } catch (error) {
      console.error("Error upvoting complaint:", error);
    }
  };

  const handleDownvote = async (index) => {
    try {
      const complaint = complaints[index];

      const response = await axios.put(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/${complaint._id}/downvote`,
        { userEmail }
      );

      if (response.status === 200) {
        const updatedComplaints = [...complaints];
        const updatedComplaint = { ...complaint };

        if (updatedComplaint.downvotedBy.includes(userEmail)) {
          const emailIndex = updatedComplaint.downvotedBy.indexOf(userEmail);
          updatedComplaint.downvotedBy.splice(emailIndex, 1);
        } else {
          const upvotedIndex = updatedComplaint.upvotedBy.indexOf(userEmail);
          if (upvotedIndex !== -1) {
            updatedComplaint.upvotedBy.splice(upvotedIndex, 1);
          }
          updatedComplaint.downvotedBy.push(userEmail);
        }

        const upvoteCount = updatedComplaint.upvotedBy.length;
        const downvoteCount = updatedComplaint.downvotedBy.length;
        const totalCount = upvoteCount - downvoteCount;

        updatedComplaint.voteCount = totalCount;

        updatedComplaints[index] = updatedComplaint;
        setComplaints(updatedComplaints);
      }
    } catch (error) {
      console.error("Error downvoting complaint:", error);
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
                      <BiUpvote className="vote-arrows" onClick={() => handleUpvote(index)} />
                      <h1>{((complaint.upvotedBy && complaint.upvotedBy.length) || 0) - ((complaint.downvotedBy && complaint.downvotedBy.length) || 0)}</h1>
                      <BiDownvote className="vote-arrows" onClick={() => handleDownvote(index)} />
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
