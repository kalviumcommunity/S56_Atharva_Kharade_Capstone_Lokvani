import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AreaSort = ({ areas, handleChange }) => {
  const handleSelectChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="area-select-label">Area</InputLabel>
      <Select
        labelId="area-select-label"
        id="area-select"
        label="Area"
        onChange={handleSelectChange}
      >
        <MenuItem value="">All Areas</MenuItem>
        {areas.map((area, index) => (
          <MenuItem key={index} value={area}>
            {area}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AreaSort;
