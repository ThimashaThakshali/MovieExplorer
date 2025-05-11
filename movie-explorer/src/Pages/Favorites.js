import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieList from "../bg/MovieList";
import SearchBar from "../bg/SearchBar";
import { Container, Typography } from "@mui/material";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Favorites
      </Typography>
      {favorites.length > 0 ? (
        <MovieList movies={favorites} />
      ) : (
        <Typography>No favorites yet!</Typography>
      )}
    </Container>
  );
};

export default Favorites;
