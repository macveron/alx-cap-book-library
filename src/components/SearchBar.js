import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        placeholder="search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id="search-button" onClick={handleSearch}>
        search
      </button>
    </div>
  );
};

export default SearchBar;
