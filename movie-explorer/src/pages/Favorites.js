import React, { useContext, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieList from "../components/MovieList";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter favorites based on search term
  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        My Favorites
      </Typography>

      {favorites.length > 0 ? (
        <>
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search your favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Paper>

          {filteredFavorites.length > 0 ? (
            <Grid container spacing={3}>
              {filteredFavorites.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No favorites match your search term: "{searchTerm}"
            </Alert>
          )}
        </>
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            No favorites yet!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Search for movies and click the heart icon to add them to your
            favorites.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Favorites;
