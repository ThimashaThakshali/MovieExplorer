import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    // Get from localStorage, default to system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    } else {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: "",
    yearFrom: 1900,
    yearTo: new Date().getFullYear(),
    rating: 0,
  });
  const [unfilteredMovies, setUnfilteredMovies] = useState([]);

  const API_KEY = "c61cf8b548703717097672494bb13aec";

  useEffect(() => {
    // Save darkMode preference to localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Apply filters client-side when filters change
  useEffect(() => {
    if (unfilteredMovies.length > 0) {
      applyFilters();
    }
  }, [filters]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      h4: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: darkMode
                ? "0 8px 20px rgba(0,0,0,0.4)"
                : "0 8px 20px rgba(0,0,0,0.2)",
            },
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      searchMovies(query, 1); // Reset to page 1 on new search
    }
  };

  // Apply filters to the current set of unfiltered movies
  const applyFilters = () => {
    const filteredResults = unfilteredMovies.filter((movie) => {
      // Filter by genre
      const matchesGenre = filters.genre
        ? movie.genre_ids?.includes(Number(filters.genre))
        : true;

      // Filter by year
      const releaseYear = movie.release_date?.split("-")[0];
      const matchesYear =
        releaseYear &&
        Number(releaseYear) >= filters.yearFrom &&
        Number(releaseYear) <= filters.yearTo;

      // Filter by rating
      const matchesRating = movie.vote_average >= filters.rating;

      return matchesGenre && matchesYear && matchesRating;
    });

    if (filteredResults.length === 0 && unfilteredMovies.length > 0) {
      setError(
        "No movies match your filter criteria. Try adjusting your filters."
      );
    } else {
      setError("");
    }

    setMovies(filteredResults);
  };

  const searchMovies = async (queryToSearch = query, pageNum = 1) => {
    if (!queryToSearch.trim()) return;
    setLoading(true);
    setError("");

    try {
      // Basic search URL without filters for client-side filtering
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        queryToSearch
      )}&page=${pageNum}`;

      const res = await axios.get(url);

      if (res.data.results.length === 0) {
        setError("No movies found. Try a different search term.");
      }

      const newMovies =
        pageNum === 1
          ? res.data.results
          : [...unfilteredMovies, ...res.data.results];

      setUnfilteredMovies(newMovies);
      setTotalPages(res.data.total_pages);
      setPage(pageNum);
      localStorage.setItem("lastSearch", queryToSearch);

      // Apply filters to the new results
      const filteredResults = newMovies.filter((movie) => {
        // Filter by genre
        const matchesGenre = filters.genre
          ? movie.genre_ids?.includes(Number(filters.genre))
          : true;

        // Filter by year
        const releaseYear = movie.release_date?.split("-")[0];
        const matchesYear =
          releaseYear &&
          Number(releaseYear) >= filters.yearFrom &&
          Number(releaseYear) <= filters.yearTo;

        // Filter by rating
        const matchesRating = movie.vote_average >= filters.rating;

        return matchesGenre && matchesYear && matchesRating;
      });

      if (filteredResults.length === 0 && newMovies.length > 0) {
        setError(
          "No movies match your filter criteria. Try adjusting your filters."
        );
      }

      setMovies(filteredResults);
    } catch (err) {
      setError(
        "Failed to fetch movies. Please check your connection and try again."
      );
      console.error("Search error:", err);
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
                    unfilteredMovies={unfilteredMovies}
                    searchMovies={searchMovies}
                    page={page}
                    totalPages={totalPages}
                    filters={filters}
                    setFilters={setFilters}
                    applyFilters={applyFilters}
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
