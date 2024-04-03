import React, { useState } from 'react';
import './LogComplaint.css';
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import PuneAreaSelect from "../Components/AreaSelect";
import ComplaintType from "../Components/ComplaintType";
import axios from 'axios';
import UserDashboard from '../Components/UserDashboard';
import { useNavigate } from 'react-router-dom';

const LogComplaint = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [location, setLocation] = useState('');

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setArea('');
        setComplaintType('');
        setLocation('');
        navigate('/User')
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/Complaint', {
                title,
                description,
                area,
                complaintType,
                Location: location,
            });
            console.log('Complaint created successfully:', response.data);
            setTitle('');
            setDescription('');
            setArea('');
            setComplaintType('');
            setLocation('');
            setImage('');
        } catch (error) {
            console.error('Error creating complaint:', error);
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
                            id="Complaint-title--input"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                style: {
                                    fontSize: "20px",
                                    marginTop: "-30px",
                                    height: "40px",
                                    borderRadius: "6px",
                                },
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            InputProps={{
                                style: {
                                    fontSize: "20px",
                                    marginTop: "-30px",
                                    borderRadius: "6px",
                                    height: "80px",
                                },
                            }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="Complaint-Location">
                        <div className="Complaint-Area-input">
                            <PuneAreaSelect onChange={(e) => setArea(e.target.value)} />
                        </div>
                        <div className="Complaint-Options-input">
                            <ComplaintType onChange={(e) => setComplaintType(e.target.value)} />
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
                            Location
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
                        <TextField
                            id="Complaint-Image-input"
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
                        />
                    </div>

                    <div className="Complaint-buttons">
                        <button id='cancel' onClick={handleCancel}>Cancel</button>
                        <button id='submit' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogComplaint;
