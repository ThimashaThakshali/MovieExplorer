import React from "react";

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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && movies.length === 0 && query && !error && (
        <p>No movies found for "{query}".</p>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div style={{ height: "300px", backgroundColor: "#ddd" }}>
                No Image
              </div>
            )}
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
