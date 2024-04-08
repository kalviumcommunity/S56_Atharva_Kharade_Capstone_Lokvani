import React, { useState, useEffect } from 'react';
import './LogComplaint.css';
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import PuneAreaSelect from "../Components/AreaSelect";
import ComplaintType from "../Components/ComplaintType";
import axios from 'axios';
import UserDashboard from '../Components/UserDashboard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
};

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

    useEffect(() => {
        const userEmail = getCookie('email');
        console.log('User Email:', userEmail);
    }, []);

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setArea('');
        setComplaintType('');
        setLocation('');
        navigate('/User');
    };

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);

        const wordCount = inputTitle.trim().split(/\s/).filter(Boolean).length;

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

        const wordCount = inputDescription.trim().split(/\s/).filter(Boolean).length;

        if (wordCount < 25) {
            setDescriptionError('Description must contain at least 25 words');
        } else if (wordCount > 100) {
            setDescriptionError('Description is too long');
        } else {
            setDescriptionError('');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        try {
            const userEmail = getCookie('email');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('area', area);
            formData.append('complaintType', complaintType);
            formData.append('location', location);
            formData.append('image', file);
            formData.append('createdBy', userEmail);

            const response = await axios.post('https://s56-atharva-kharade-capstone-lokvani.onrender.com/Complaint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Complaint created successfully:', response.data);
            toast.success('Complaint submitted successfully.');
            setTitle('');
            setDescription('');
            setArea('');
            setComplaintType('');
            setLocation('');
            setFile(null);
        } catch (error) {
            console.error('Error creating complaint:', error);
            toast.error('Failed to submit complaint.');
        }
    };

    return (
        <div className="Complaint-main-body">
            <UserDashboard />
            <div className='Complaint-main'>
                <div className="Complaint-Box-Body">
                    <h1>Raise A Complaint</h1>
                    <div className="Complaint-title-input">
                        <InputLabel
                            shrink
                            htmlFor="Complaint-title-input"
                            style={{
                                fontSize: "35px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "10px",
                            }}
                            required
                        >
                            Title
                        </InputLabel>
                        <TextField
                            id="Complaint-title-input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                style: {
                                    fontSize: "20px",
                                    marginTop: "-30px",
                                    height: "40px",
                                    borderRadius: "6px",
                                    borderColor: titleError ? 'red' : '',
                                },
                            }}
                            value={title}
                            onChange={handleTitleChange}
                            error={!!titleError}
                            helperText={titleError}
                        />
                    </div>

                    <div className="Complaint-descp-input">
                        <InputLabel
                            shrink
                            htmlFor="Complaint-descp-input"
                            style={{
                                fontSize: "35px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "10px",
                            }}
                            required
                        >
                            Description
                        </InputLabel>
                        <TextField
                            id="Complaint-descp-input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            size='small'
                            InputProps={{
                                style: {
                                    fontSize: "20px",
                                    marginTop: "-30px",
                                    borderRadius: "6px",
                                },
                            }}
                            value={description}
                            onChange={handleDescriptionChange}
                            error={!!descriptionError}
                            helperText={descriptionError}
                        />
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
                        <InputLabel
                            shrink
                            htmlFor="Complaint-Location-input"
                            style={{
                                fontSize: "35px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "15px",
                            }}
                        >
                            Location <span style={{ fontSize: "14px" }}>(Optional)</span>
                        </InputLabel>
                        <TextField
                            id="Complaint-Location-input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            InputProps={{
                                style: {
                                    fontSize: "20px",
                                    marginTop: "-30px",
                                    borderRadius: "6px",
                                    height: "40px",
                                },
                            }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="Complaint-Image-input">
                        <InputLabel
                            shrink
                            htmlFor="Complaint-Image-input"
                            style={{
                                fontSize: "35px",
                                fontWeight: "400",
                                color: "#000000",
                                fontFamily: "Poppins",
                                marginTop: "15px",
                            }}
                            required
                        >
                            Image
                        </InputLabel>
                        <input type="file" onChange={handleFileChange} />
                    </div>

                    <div className="Complaint-buttons">
                        <button id='cancel' onClick={handleCancel}>Cancel</button>
                        <button id='submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LogComplaint;
