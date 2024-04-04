import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const areasInPune = [
  "Hadapsar",
  "Kothrud",
  "Aundh",
  "Wakad",
  "Hinjewadi",
  "Kondhwa",
  "Baner",
  "Viman Nagar",
  "Kharadi",
  "Pimple Saudagar",
  "Koregaon Park",
];

const PuneAreaSelect = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [showHelperText, setShowHelperText] = useState(true);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setShowHelperText(true);
  };

  const handleSelectChange = (event, newValue) => {
    if (newValue && !areasInPune.includes(newValue)) {
      areasInPune.push(newValue);
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
        onChange={handleSelectChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={areasInPune}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Area"
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

export default PuneAreaSelect;
