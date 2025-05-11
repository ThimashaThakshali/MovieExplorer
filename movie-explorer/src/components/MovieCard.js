import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Card sx={{ maxWidth: 200, m: 2, position: "relative" }}>
      <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {movie.poster_path ? (
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <Box
            height={300}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#ddd"
          >
            <Typography>No Image</Typography>
          </Box>
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.slice(0, 4)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {movie.vote_average}
          </Typography>
        </CardContent>
      </Link>
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          color: favorite ? "red" : "gray",
        }}
        onClick={handleFavoriteClick}
        aria-label="add to favorites"
      >
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default MovieCard;
