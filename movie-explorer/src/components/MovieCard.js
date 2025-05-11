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
    <Card
      sx={{
        width: 200,
        height: "100%",
        m: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {movie.poster_path ? (
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            height={300}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(0,0,0,0.1)"
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography variant="body2">No Image Available</Typography>
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1, pb: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.2,
              height: "2.4em",
              mb: 1,
            }}
          >
            {movie.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: 1, paddingBottom: 1 }}
          >
            {movie.release_date?.slice(0, 4)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: 1, paddingBottom: 0 }}
          >
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </Typography>
        </CardContent>
      </Link>
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          color: favorite ? "red" : "rgba(255,255,255,0.8)",
          backgroundColor: "rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          width: 36,
          height: 36,
        }}
        onClick={handleFavoriteClick}
        aria-label="add to favorites"
      >
        <FavoriteIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default MovieCard;
