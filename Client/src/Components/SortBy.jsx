import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortBySelect = ({ handleChange }) => {
  const [value, setValue] = useState("");
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
        value={value}
        onChange={handleSelectChange}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="most-voted">Most Voted</MenuItem>
        <MenuItem value="most-downvoted">Most Downvoted</MenuItem>
        <MenuItem value="most-commented">Most Commented</MenuItem>
        <MenuItem value="least-commented">Least Commented</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBySelect;
