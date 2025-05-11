import React from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

const Home = ({
  query,
  setQuery,
  handleInputChange,
  handleKeyPress,
  loading,
  error,
  movies,
}) => {
  return (
    <div>
      <SearchBar
        query={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && movies.length === 0 && query && !error && (
        <p>No movies found for "{query}".</p>
      )}

      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
