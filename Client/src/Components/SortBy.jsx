import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortBySelect = ({ handleChange }) => {
  const handleSelectChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        label="Sort By"
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
