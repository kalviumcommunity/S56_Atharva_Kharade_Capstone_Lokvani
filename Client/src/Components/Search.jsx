import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({ value, onChange }) => {
    return (
        <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search for Complaints"
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="search">
                            <IoSearchOutline />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchInput;
