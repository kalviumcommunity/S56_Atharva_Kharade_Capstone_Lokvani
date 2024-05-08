import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortBySelect = ({ handleChange }) => {
  const [value, setValue] = useState(""); // Initialize the value state

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    handleChange(selectedValue);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        label="Sort By"
        value={value} // Set the value prop
        onChange={handleSelectChange}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="most-voted">Most Voted</MenuItem>
        <MenuItem value="most-downvoted">Most Downvoted</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBySelect;
