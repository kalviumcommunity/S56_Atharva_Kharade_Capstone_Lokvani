import React, { useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [showHelperText, setShowHelperText] = useState(true);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setShowHelperText(true);
  };

  const handleSelectChange = (event, newValue) => {
    if (newValue && !complaintOptions.includes(newValue)) {
      complaintOptions.push(newValue);
    }
    onChange(newValue);
    setShowHelperText(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowHelperText(false);
    }
  };

  return (
    <div>
      <Autocomplete
        fullWidth
        size="small"
        value={value}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        options={complaintOptions}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Complaint Type"
            variant="outlined"
            fullWidth
            onKeyDown={handleKeyDown}
          />
        )}
      />
      {showHelperText && (
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
          Press Enter to confirm your input
        </div>
      )}
    </div>
  );
};

export default ComplaintType;
