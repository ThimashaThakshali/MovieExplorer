import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ query, onChange, onKeyPress }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search for a movie..."
    value={query}
    onChange={onChange}
    onKeyPress={onKeyPress}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
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
