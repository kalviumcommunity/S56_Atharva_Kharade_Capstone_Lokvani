import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Components/AdminDashboard';
import SortBySelect from "../Components/SortBy";
import SearchInput from "../Components/Search";
import axios from "axios";
import CustomPagination from "../Components/Pagination";

const AdminComplaintPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, [currentPage, sortBy, searchQuery]);

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
                filteredComplaints = filteredComplaints.filter(complaint =>
                    complaint.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handleDelete = async (complaintId) => {
        try {
            const response = await axios.delete(`https://s56-atharva-kharade-capstone-lokvani.onrender.com/DeleteComplaint/${complaintId}`);
            if (response.status === 200) {
                setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint._id !== complaintId));
            }
        } catch (error) {
            console.error("Error deleting complaint:", error);
        }
    };
    

    return (
        <>
            <div className='AdminPage-main-body'>
                <AdminDashboard />
                <div className="AdminPage-body">
                    <div className="Admin-SearchBar">
                        <div className="SearchBar-left">
                            <div className="SearchBar-sort">
                                <SortBySelect onChange={handleSortChange} />
                            </div>
                            <div className="SearchBar-areaSelect">
                                
                            </div>
                        </div>
                        <div className="SearchBar-searchInput">
                            <SearchInput onChange={handleSearchChange} />
                        </div>
                    </div>
                    <div className="Admin-Complaints">
                        {complaints.map(complaint => (
                            <div key={complaint._id} className="MyComplaint-complaint-box">
                                <div className="MyComplaint-box-title">
                                    <h1>{complaint.title}</h1>
                                </div>
                                <div className="MyComplaint-img">
                                    <img src={complaint.Image} alt="Complaint Image" className='complaint-img-size' />
                                </div>
                                <div className="MyComplaint-descp">
                                    <p>{complaint.description}</p>
                                </div>
                                <div className="MyComplaint-function">
                                    <div className="MyComplaint-upvote">
                                        <h1>Votes: {complaint.voteCount}</h1>
                                    </div>
                                    <div className="MyComplaint-comment">
                                        Comments: 4
                                    </div>
                                    <div className="MyComplaint-status">
                                        Area: {complaint.area}
                                    </div>
                                    <div className="MyComplaint-status">
                                        Type: {complaint.complaintType}
                                    </div>
                                </div>
                                <div>
                                <button onClick={() => handleDelete(complaint._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CustomPagination
                        count={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>
        </>
    );
};

export default AdminComplaintPage;
