import React from 'react'
import './LogComplaint.css'

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import PuneAreaSelect from "../Components/AreaSelect";
import ComplaintType from "../Components/ComplaintType";

const LogComplaint = () => {
    return (
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
                        multilinema
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

                <div className="Complaint-Location">
                    <div className="Complaint-Area-input">
                        <PuneAreaSelect />
                    </div>
                    <div className="Complaint-Options-input">
                        <ComplaintType />
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
                        multilinema
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
                        multilinema
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
                    <button id='cancel'>Cancel</button>
                    <button id='submit'>Submit</button>
                </div>
            </div>

        </div>
    )
}

export default LogComplaint
