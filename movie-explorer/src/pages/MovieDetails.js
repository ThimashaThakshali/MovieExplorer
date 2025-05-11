import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Chip,
  Rating,
  CircularProgress,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const API_KEY = "c61cf8b548703717097672494bb13aec";

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        setMovie(res.data);
      } catch (err) {
        setError("Movie not found or an error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const favorite = movie ? isFavorite(movie.id) : false;

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  if (!movie) return null;

  // Find trailer
  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  // Get director and top cast
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director"
  );

  const cast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Card elevation={4}>
              {movie.poster_path ? (
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ borderRadius: 1 }}
                />
              ) : (
                <Box
                  sx={{
                    height: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#eee",
                  }}
                >
                  <Typography>No Image Available</Typography>
                </Box>
              )}
            </Card>
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title}
                {movie.release_date && (
                  <Typography
                    variant="h5"
                    component="span"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({movie.release_date.substring(0, 4)})
                  </Typography>
                )}
              </Typography>
              <IconButton
                onClick={handleFavoriteClick}
                sx={{
                  color: favorite ? "red" : "gray",
                  "&:hover": {
                    color: favorite ? "red" : "rgba(255, 0, 0, 0.7)",
                  },
                }}
              >
                <FavoriteIcon fontSize="large" />
              </IconButton>
            </Box>

            {/* Rating and Genres */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {movie.vote_average > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {movie.vote_average.toFixed(1)}/10
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Genres */}
            <Box sx={{ mb: 2 }}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>

            {/* Runtime and Release Date */}
            <Box sx={{ mb: 3 }}>
              {movie.runtime > 0 && (
                <Typography variant="body1" color="text.secondary">
                  Runtime: {Math.floor(movie.runtime / 60)}h{" "}
                  {movie.runtime % 60}m
                </Typography>
              )}
              {movie.release_date && (
                <Typography variant="body1" color="text.secondary">
                  Release Date:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Overview */}
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.overview || "No overview available."}
            </Typography>

            {/* Director & Cast */}
            {director && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Director:</strong> {director.name}
              </Typography>
            )}

            {cast.length > 0 && (
              <>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Cast:</strong>{" "}
                  {cast.map((person) => person.name).join(", ")}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        {/* Trailer Section */}
        {trailer && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Trailer
            </Typography>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                maxWidth: "100%",
                borderRadius: 2,
              }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MovieDetails;
