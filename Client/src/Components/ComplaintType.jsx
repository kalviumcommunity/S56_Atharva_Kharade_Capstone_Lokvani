import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComaplaintOptions = [
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

export default function ComplaintType() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      fullWidth
      size="small"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      options={ComaplaintOptions}
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
}
