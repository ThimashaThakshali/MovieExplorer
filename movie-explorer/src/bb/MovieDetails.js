import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // gets the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "c61cf8b548703717097672494bb13aec";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        setMovie(res.data);
      } catch (err) {
        setError("Movie not found.");
      }
    };
    fetchMovie();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      {trailer && (
        <div>
          <h3>Trailer:</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube trailer"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
