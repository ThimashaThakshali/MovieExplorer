import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // NEW
  const [error, setError] = useState(null); // NEW

  const API_KEY = "c61cf8b548703717097672494bb13aec"; // Replace with your TMDb API key

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const searchMovies = async () => {
    if (!query) return;
    setLoading(true); // Start loading
    setError(null); // Clear errors
    setMovies([]); // Clear old movies

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError("Something went wrong while fetching movies. 😢");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="app">
      <h1>Movie Explorer 🎬</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Loading message */}
      {loading && <p>Loading movies...</p>}

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* No results message */}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
