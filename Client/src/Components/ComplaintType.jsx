import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const complaintOptions = [
  "Potholes",
  "Sanitation Issues",
  "Noise Pollution",
  "Water Supply Problems",
  "Traffic Congestion",
  "Stray Animals",
  "Street Lighting Issues",
  "Encroachment on Public Land",
  "Park Maintenance",
  "Illegal Construction"
];

const ComplaintType = ({ value, onChange }) => {
  return (
    <Autocomplete
      fullWidth
      size="small"
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={complaintOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Complaint Type"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default ComplaintType;
