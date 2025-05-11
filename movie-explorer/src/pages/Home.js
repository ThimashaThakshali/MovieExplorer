// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, CircularProgress, Container } from "@mui/material";
import axios from "axios";

const Home = ({
  query,
  setQuery,
  handleInputChange,
  handleKeyPress,
  loading,
  error,
  movies,
}) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=c61cf8b548703717097672494bb13aec`
      );
      setTrending(res.data.results);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  return (
    <Container>
      <SearchBar
        query={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {movies.length > 0 && (
        <>
          <Typography variant="h5" sx={{ my: 2 }}>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>
        </>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Trending Movies
      </Typography>
      <Grid container spacing={2}>
        {trending.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      {movies.length > 0 && page < totalPages && (
        <Button
          variant="contained"
          onClick={() => searchMovies(query, page + 1)}
          sx={{ mt: 2 }}
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default Home;
