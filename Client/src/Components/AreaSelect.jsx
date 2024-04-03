import React from "react";
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
  return (
    <Autocomplete
      fullWidth
      size="small"
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={areasInPune}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Area"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default PuneAreaSelect;
