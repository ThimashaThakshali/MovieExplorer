import React from "react";
import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, filters }) => {
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = filters.genre
      ? movie.genre_ids?.includes(Number(filters.genre))
      : true;

    const releaseYear = movie.release_date?.split("-")[0];
    const matchesYear =
      releaseYear &&
      releaseYear >= filters.yearFrom &&
      releaseYear <= filters.yearTo;

    const matchesRating = movie.vote_average >= filters.rating;

    return matchesGenre && matchesYear && matchesRating;
  });

  return (
    <Grid container spacing={3} justifyContent="center">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="error" sx={{ mt: 4 }}>
          No movies found matching your filters.
        </Typography>
      )}
    </Grid>
  );
};

export default MovieList;
