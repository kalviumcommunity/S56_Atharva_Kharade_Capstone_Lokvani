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

export default function PuneAreaAutocomplete() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      fullWidth
      size="small"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
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
}
