import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Filters = ({ filters, setFilters, searchMovies, query }) => {
  const [genres, setGenres] = useState([]);
  const [tempFilters, setTempFilters] = useState(filters);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=c61cf8b548703717097672494bb13aec`
        );
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    if (query.trim()) {
      searchMovies(query, 1);
    }
  };

  const handleResetFilters = () => {
    const resetFilters = {
      genre: "",
      yearFrom: 1900,
      yearTo: currentYear,
      rating: 0,
    };
    setTempFilters(resetFilters);
    setFilters(resetFilters);
    if (query.trim()) {
      searchMovies(query, 1);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              value={tempFilters.genre}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, genre: e.target.value })
              }
              label="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography gutterBottom>
              Year Range: {tempFilters.yearFrom} - {tempFilters.yearTo}
            </Typography>
            <Slider
              value={[tempFilters.yearFrom, tempFilters.yearTo]}
              onChange={(e, newValue) =>
                setTempFilters({
                  ...tempFilters,
                  yearFrom: newValue[0],
                  yearTo: newValue[1],
                })
              }
              min={1900}
              max={currentYear}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography gutterBottom>
              Minimum Rating: {tempFilters.rating.toFixed(1)}
            </Typography>
            <Slider
              value={tempFilters.rating}
              onChange={(e, newValue) =>
                setTempFilters({ ...tempFilters, rating: newValue })
              }
              min={0}
              max={10}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleApplyFilters}
            fullWidth
          >
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={handleResetFilters}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
