import React, { useState, useContext } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "c61cf8b548703717097672494bb13aec";

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  const searchMovies = async (queryToSearch = query) => {
    if (!queryToSearch.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          queryToSearch
        )}`
      );
      setMovies(res.data.results);
      localStorage.setItem("lastSearch", queryToSearch);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/login" element={<Login />} />
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
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
