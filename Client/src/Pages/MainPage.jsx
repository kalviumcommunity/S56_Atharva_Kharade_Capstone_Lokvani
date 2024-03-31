import React from "react";
import "./MainPage.css";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 170,
    },
  },
};

const options = [
  'None',
  'Most Liked',
  'Least Liked',
  'Most Commented',
  'Least Commented',
];

const MainPage = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = React.useState('None');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="MainPage-body">
      <div className="MainPage-middle">
        <div className="middle-SearchBar">
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            onChange={handleChange}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            sx={{ Width: 100 }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="MainPage-side">
        <div className="MainPage-side-Navbar">
          {/* Your side content here */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
