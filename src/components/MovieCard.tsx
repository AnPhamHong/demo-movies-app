import React, { useState } from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../api/api";

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
  viewMode?: "list" | "grid";
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  viewMode = "grid",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className={`movie-card ${viewMode} ${imageLoaded ? "loaded" : ""}`}
      onClick={() => onClick(movie.id)}
    >
      <div className="movie-card__image-wrapper">
        {!imageLoaded && <div className="movie-card__placeholder"></div>}
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="movie-card__image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__rating">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__date">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}
        </p>
        {viewMode === "list" && (
          <p className="movie-card__overview">
            {movie.overview.length > 150
              ? `${movie.overview.substring(0, 150)}...`
              : movie.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
