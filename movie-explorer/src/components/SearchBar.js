import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ query, onChange, onKeyPress }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search for a movie..."
    value={query}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{
      mb: 4,
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        backgroundColor: "background.paper",
      },
    }}
  />
);

export default SearchBar;
