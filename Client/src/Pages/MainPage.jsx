import React, { useState, useEffect,useContext } from "react";
import { ring2 } from 'ldrs';
import "./CSS/MainPage.css";
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import CustomPagination from "../Components/Pagination";
import { MdGroupAdd, MdGroups } from "react-icons/md";
import { UserContext } from '../UserContext';

ring2.register();

const MainPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState([]);
  const [email, setEmail] = useState("");
  const [loadingCommunities, setLoadingCommunities] = useState(false);
  const token = Cookies.get("token");
    const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    fetchComplaints();
  }, [currentPage, sortBy, searchQuery]);

  // useEffect(() => {
  //   handleUserDetails();
  // }, [token]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint`, {
        params: {
          page: currentPage,
          limit: 7,
          sortBy: sortBy
        }
      });

      let filteredComplaints = response.data.complaints;
      if (searchQuery) {
        const keywords = searchQuery.trim().toLowerCase().split(/\s+/);
        filteredComplaints = filteredComplaints.filter(complaint =>
          keywords.every(keyword => complaint.title.toLowerCase().includes(keyword))
        );
      }

      setComplaints(filteredComplaints);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleUserDetails = async () => {
  //   try {
  //     const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails", {
  //       headers: {
  //         Authorization: token
  //       }
  //     });
  //     let userId = response.data.userId;
  //     fetchCommunities(response.data.email);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  const handleUpvote = async (index) => {
    const userId = email;
    try {
      const updatedComplaints = [...complaints];
      const complaint = updatedComplaints[index];

      if (complaint.upvotedBy.includes(userId)) {
        const emailIndex = complaint.upvotedBy.indexOf(userId);
        complaint.upvotedBy.splice(emailIndex, 1);
      } else {
        if (complaint.downvotedBy.includes(userId)) {
          const downvotedIndex = complaint.downvotedBy.indexOf(userId);
          complaint.downvotedBy.splice(downvotedIndex, 1);
        }
        complaint.upvotedBy.push(userId);
      }

      const response = await axios.put(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/${complaint._id}/upvote`,
        { userId }
      );

      if (response.status === 200) {
        setComplaints(updatedComplaints);
      } else {
        if (complaint.upvotedBy.includes(userId)) {
          const emailIndex = complaint.upvotedBy.indexOf(userId);
          complaint.upvotedBy.splice(emailIndex, 1);
        }
        setComplaints(updatedComplaints);
      }
    } catch (error) {
      console.error("Error upvoting complaint:", error);
    }
  };

  const handleDownvote = async (index) => {
    const userId = email;
    try {
      const updatedComplaints = [...complaints];
      const complaint = updatedComplaints[index];

      if (complaint.downvotedBy.includes(userId)) {
        const emailIndex = complaint.downvotedBy.indexOf(userId);
        complaint.downvotedBy.splice(emailIndex, 1);
      } else {
        if (complaint.upvotedBy.includes(userId)) {
          const upvotedIndex = complaint.upvotedBy.indexOf(userId);
          complaint.upvotedBy.splice(upvotedIndex, 1);
        }
        complaint.downvotedBy.push(userId);
      }

      const response = await axios.put(
        `https://s56-atharva-kharade-capstone-lokvani.onrender.com/${complaint._id}/downvote`,
        { userId }
      );

      if (response.status === 200) {
        setComplaints(updatedComplaints);
      } else {
        if (complaint.downvotedBy.includes(userId)) {
          const emailIndex = complaint.downvotedBy.indexOf(userId);
          complaint.downvotedBy.splice(emailIndex, 1);
        }
        setComplaints(updatedComplaints);
      }
    } catch (error) {
      console.error("Error downvoting complaint:", error);
    }
  };

  const fetchCommunities = async (userId) => {
    setLoadingCommunities(true);
    try {
      const response = await axios.get(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/getCommunity`, {
        params: { userId }
      });
      setCommunities(response.data);
      setLoadingCommunities(false);
    } catch (error) {
      console.error("Error fetching communities:", error);
      setLoadingCommunities(false);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      const response = await axios.post(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/addMember`, {
        communityId,
        userId
      });

      if (response.status === 200) {
        fetchCommunities(userId);
      }
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  return (
    <div className="MainPage-body">
      <div className="MainPage-middle">
        <div className="middle-SearchBar">
          <div className="SearchBar-left">
            <div className="SearchBar-sort">
              <SortBySelect handleChange={handleSortChange} />
            </div>
            <div className="SearchBar-areaSelect">
              <SortBySelect />
            </div>
          </div>
          <div className="SeachBar-searchInput">
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
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
                      {complaint.upvotedBy.includes(userId) ? (
                        <BiSolidUpvote className="vote-arrows arrows-fill" onClick={() => handleUpvote(index)} />
                      ) : (
                        <BiUpvote className="vote-arrows" onClick={() => handleUpvote(index)} />
                      )}
                      <h1>{((complaint.upvotedBy && complaint.upvotedBy.length) || 0) - ((complaint.downvotedBy && complaint.downvotedBy.length) || 0)}</h1>
                      {complaint.downvotedBy.includes(userId) ? (
                        <BiSolidDownvote className="vote-arrows arrows-fill" onClick={() => handleDownvote(index)} />
                      ) : (
                        <BiDownvote className="vote-arrows" onClick={() => handleDownvote(index)} />
                      )}
                    </div>
                    <div className="Complaint-comment">
                      <Link to={`/comment/${complaint._id}`}><FaRegComment className="comment-arrows" /></Link>
                      <h1>{complaint.comments.length}</h1>
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
        <div className="MainPage-side-Navbar">
          <h1>Suggested Communities</h1>
          {loadingCommunities ? (
            <l-ring-2
              size="40"
              stroke="5"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="black"
            ></l-ring-2>
          ) : (
            communities.map((community, index) => (
              <div className="MainPage-community-name" key={index}>
                <h1>{community.name}</h1>
                <div className="MainPage-community-name-function">
                  <div className="community-function-members">
                    <MdGroups className="community-btn-img" />
                    <h1>{community.members.length}</h1>
                  </div>
                  <button onClick={() => handleJoinCommunity(community._id)}><MdGroupAdd className="Join-community-btn-img" /> Join</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
