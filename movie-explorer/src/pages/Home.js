import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";
import {
  Grid,
  Typography,
  CircularProgress,
  Container,
  Button,
  Box,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const Home = ({
  query,
  setQuery,
  handleInputChange,
  handleKeyPress,
  loading,
  error,
  movies,
  searchMovies,
  page,
  totalPages,
  filters,
  setFilters,
}) => {
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState("");

  useEffect(() => {
    fetchTrendingMovies();

    // Check for last search in localStorage
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch && lastSearch !== query) {
      setQuery(lastSearch);
      searchMovies(lastSearch, 1);
    }
  }, []);

  const fetchTrendingMovies = async () => {
    setTrendingLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=c61cf8b548703717097672494bb13aec`
      );
      setTrending(res.data.results);
    } catch (err) {
      setTrendingError(
        "Failed to fetch trending movies. Please try again later."
      );
    } finally {
      setTrendingLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchMovies(query, 1);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: "background.default",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Movie Explorer
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Search for movies, discover trending films, and save your favorites.
        </Typography>

        <Box sx={{ display: "flex", mb: 3, maxWidth: "600px", mx: "auto" }}>
          <SearchBar
            query={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </Box>

        <Filters
          filters={filters}
          setFilters={setFilters}
          searchMovies={searchMovies}
          query={query}
        />
      </Paper>

      {/* Search Results Section */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {movies.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            Search Results ({movies.length})
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          {page < totalPages && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                onClick={() => searchMovies(query, page + 1)}
                disabled={loading}
                size="large"
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </Box>
          )}
        </Box>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Trending Movies Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Trending This Week
      </Typography>

      {trendingLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : trendingError ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {trendingError}
        </Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {trending.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
