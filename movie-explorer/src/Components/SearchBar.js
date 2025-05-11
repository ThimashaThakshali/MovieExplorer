import React from "react";

const SearchBar = ({ query, onChange, onKeyPress }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search for a movie..."
      value={query}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  </div>
);

export default SearchBar;
