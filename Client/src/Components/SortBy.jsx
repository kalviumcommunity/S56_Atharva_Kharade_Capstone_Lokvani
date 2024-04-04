import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortBySelect = ({ option, handleChange }) => {
  const handleSelectChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        value={option || ""}
        label="Sort By"
        onChange={handleSelectChange}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="most-liked">Most Liked</MenuItem>
        <MenuItem value="least-liked">Least Liked</MenuItem>
        <MenuItem value="most-commented">Most Commented</MenuItem>
        <MenuItem value="least-commented">Least Commented</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBySelect;