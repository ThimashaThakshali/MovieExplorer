import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "c61cf8b548703717097672494bb13aec";

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setMovies([]);

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
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>Movie Explorer 🎬</h1>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                query={query}
                setQuery={setQuery}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
                loading={loading}
                error={error}
                movies={movies}
              />
            }
          />
          {/* More routes coming soon */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
