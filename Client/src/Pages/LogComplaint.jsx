import React, { useState, useEffect } from 'react';
import './CSS/LogComplaint.css';
import PuneAreaSelect from "../Components/AreaSelect";
import ComplaintType from "../Components/ComplaintType";
import axios from 'axios';
import UserDashboard from '../Components/UserDashboard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Uploader from '../Components/fileUpload';
import CircularProgress from '@mui/material/CircularProgress';

const LogComplaint = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [location, setLocation] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleUserDetails();
    }, []);

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setArea('');
        setComplaintType('');
        setLocation('');
        setFile(null);
        navigate('/User');
    };

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);

        const wordCount = inputTitle.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount < 3) {
            setTitleError('Title must contain at least 3 words');
        } else if (wordCount > 7) {
            setTitleError('Title is too long');
        } else {
            setTitleError('');
        }
    };

    const handleDescriptionChange = (e) => {
        const inputDescription = e.target.value;
        setDescription(inputDescription);

        const wordCount = inputDescription.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount < 25) {
            setDescriptionError('Description must contain at least 25 words');
        } else if (wordCount > 100) {
            setDescriptionError('Description is too long');
        } else {
            setDescriptionError('');
        }
    };

    const handleUserDetails = async () => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get("https://s56-atharva-kharade-capstone-lokvani.onrender.com/UserDetails", {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data.userId);
            setUserId(response.data.userId);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !area || !complaintType || !file) {
            toast.error('Please fill out all fields.');
            return;
        }

        if (titleError || descriptionError) {
            toast.error('Please fix the errors before submitting.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('area', area);
            formData.append('complaintType', complaintType);
            formData.append('location', location);
            formData.append('image', file);
            formData.append('createdBy', userId);

            const response = await axios.post('https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Complaint created successfully:', response.data);
            toast.success('Complaint submitted successfully.');
            handleCancel();
        } catch (error) {
            console.error('Error creating complaint:', error);
            toast.error('Failed to submit complaint.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Complaint-main-body">
            <UserDashboard />
            <div className='Complaint-main'>
                <div className="Complaint-Box-Body">
                    <h1>Raise A Complaint</h1>
                    <div className="Complaint-title-input">
                        <label className='logComplaint-label' htmlFor="Complaint-title-input">Title <span style={{ color: "red" }}>*</span></label>
                        <input
                            className="complaintInput Complaint-title-input"
                            type="text"
                            style={{
                                fontSize: "20px",
                                height: "40px",
                                borderRadius: "6px",
                                borderColor: titleError ? 'red' : '',
                                width: "100%",
                                margin: "8px 0 0 0",
                                padding: "8px"
                            }}
                            value={title}
                            onChange={handleTitleChange}
                        />
                        {titleError && <div style={{ color: "red" }}>{titleError}</div>}
                    </div>

                    <div className="Complaint-descp-input">
                        <label className='logComplaint-label' htmlFor="Complaint-title-input">Description <span style={{ color: "red" }}>*</span></label>
                        <textarea
                            className="complaintInput Complaint-descp-input"
                            style={{
                                fontSize: "20px",
                                borderRadius: "6px",
                                width: "100%",
                                margin: "8px 0 0 0",
                                padding: "8px"
                            }}
                            rows="2"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        {descriptionError && <div style={{ color: "red" }}>{descriptionError}</div>}
                    </div>

                    <div className="Complaint-Location">
                        <div className="Complaint-Area-input">
                            <PuneAreaSelect value={area} onChange={setArea} />
                        </div>
                        <div className="Complaint-Options-input">
                            <ComplaintType value={complaintType} onChange={setComplaintType} />
                        </div>
                    </div>

                    <div className="Complaint-Location-input">
                        <label className='logComplaint-label' htmlFor="Complaint-title-input">Location <span style={{ color: "red" }}>*</span></label>
                        <input
                            className="complaintInput Complaint-Location-input"
                            type="text"
                            style={{
                                fontSize: "20px",
                                borderRadius: "6px",
                                height: "40px",
                                width: "100%",
                                margin: "8px 0",
                                padding: "8px"
                            }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div style={{ width: "80%" }}>
                        <label className='logComplaint-label' htmlFor="Complaint-title-input">Image <span style={{ color: "red" }}>*</span></label>
                        <Uploader onFileSelect={(file) => setFile(file)} />
                    </div>

                    <div className="Complaint-buttons">
                        <button id='cancel' onClick={handleCancel}>Cancel</button>
                        <button id='submit' onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress size={24} color="inherit" />
                                    <span style={{ marginLeft: '8px' }}>Submitting</span>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default LogComplaint;
