/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { getImageUrl } from "../api/api";
import { FaHeart, FaInfoCircle, FaPlay, FaStar } from "react-icons/fa";
import type { MovieCardProps } from "../types/movie";

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  viewMode = "grid",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`movie-card ${viewMode}`}
      onClick={(event) => {
        viewMode === "list" ? event?.stopPropagation() : onClick(movie.id);
      }}
    >
      {viewMode === "list" ? (
        <React.Fragment>
          <img
            src={posterUrl}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="movie-card__info" onClick={() => onClick(movie.id)}>
            <h3>{movie.title}</h3>
            <span className="year">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <p className="overview">
              {movie.overview.length > 130
                ? `${movie.overview.slice(0, 130)}...`
                : movie.overview}
            </p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            className={`movie-card ${viewMode} ${imageLoaded ? "loaded" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={posterUrl}
              alt={movie.title}
              className="movie-card__poster"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            {isHovered && (
              <div className="movie-card__expanded">
                <img
                  src={backdropUrl}
                  alt={movie.title}
                  className="expanded__poster"
                />
                <div className="expanded__content">
                  <h3>{movie.title}</h3>
                  <span className="sub">{movie.original_title}</span>
                  <div className="actions">
                    <button className="play">
                      <FaPlay /> Watch Now
                    </button>
                    <button className="like">
                      <FaHeart /> Add to Favorites
                    </button>
                    <button className="detail">
                      <FaInfoCircle onClick={() => onClick(movie.id)} /> View
                      Details
                    </button>
                  </div>
                  <div className="meta">
                    <span className="badge">{movie.adult ? "18+" : "T16"}</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <div className="meta-star">
                      <FaStar color="#ffd84d" size={16} />
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <p className="overview">
                    {movie.overview.length > 130
                      ? `${movie.overview.slice(0, 130)}...`
                      : movie.overview}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className="movie-card__title"
            title={movie.title}
            onClick={() => onClick(movie.id)}
          >
            {movie.title}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MovieCard;
