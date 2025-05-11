import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <Link to={`/movie/${movie.id}`}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div style={{ height: "300px", backgroundColor: "#ddd" }}>No Image</div>
      )}
      <h3>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h3>
    </Link>
    <p>⭐ {movie.vote_average}</p>
  </div>
);

export default MovieCard;
